import { makeAutoObservable, reaction, runInAction } from "mobx";
import UserStore from "@/stores/user-store";
import { LoginResult, SessionData } from "@/types/auth/login.types";
import {
  AuthTokenType,
  clearAuthTokenCookie,
  clearSessionCookies,
  getSessionCookies,
  setSessionCookies,
} from "@/utils/auth";
import services from "@/services";
import { CreateUserRequest } from "@/types/auth/register.types";
import { registerUserSchema } from "@/types/auth/schemas/register-user.schema.ts";

class AuthStore {
  signingIn: boolean = false;
  inProgress: boolean = false;
  baseLoad: boolean = false;
  accessToken: string | null = null;
  confirmationToken: string | null = null;
  resetPasswordToken: string | null = null;
  idToken: string | null = null;
  refreshToken: string | null = null;
  authToken: string | null = null;
  creatingUser: boolean = false;
  loginError: string | null = null;
  userProfile: any = null;
  userSignedIn: boolean = false;
  loggingOut: boolean = false;
  userEmail: string | null = null;
  registrationError: string | null = null;

  private tokenRefreshTimeout: NodeJS.Timeout | null = null;
  private readonly refreshInterval: number;
  readonly sessionTimeout: number;
  readonly sessionPromptBeforeIdle: number;

  userStore: UserStore;

  constructor(userStore: UserStore) {
    this.userStore = userStore;
    makeAutoObservable(this);

    const sessionInterval = parseInt(import.meta.env.VITE_SESSION_TIMEOUT_INTERVAL || "5");
    this.refreshInterval = (sessionInterval + 5) * 6 * 1000;
    this.sessionTimeout = sessionInterval * 60 * 1000;
    this.sessionPromptBeforeIdle = parseInt(import.meta.env.VITE_SESSION_TIMEOUT_INTERVAL || "1") * 60 * 1000;

    reaction(
      () => this.accessToken,
      async (accessToken) => {
        if (accessToken) {
          if (!this.userProfile) {
            return this.pullUser();
          }
        } else {
          if (this.userProfile) this.userProfile.clearProfile();
          this.forgetUser();
          this.logout();
        }
      },
    );
    this.loadTokensFromSession();
  }

  public async registerUser(createUserRequest: CreateUserRequest): Promise<boolean> {
    this.creatingUser = true;
    try {
      const validatedData = await registerUserSchema.validate(createUserRequest, {
        abortEarly: false,
        stripUnknown: true,
      });

      const result = await services.authService.register(validatedData);

      if (result.success) {
        runInAction(() => {
          this.confirmationToken = result.confirmationToken;
        });
        return true;
      } else {
        throw new Error(result.error.message || "User creation failed");
      }
    } catch (error) {
      console.error("[AuthStore] Error creating user:", error);

      runInAction(() => {
        this.registrationError = error instanceof Error ? error.message : "User creation failed";
      });
      return false;
    } finally {
      runInAction(() => {
        this.creatingUser = false;
      });
    }
  }

  public async pullUser() {
    this.inProgress = true;
    this.baseLoad = true;
    this.setSignedIn(true);
    console.log("[AuthStore] Pulling user profile");
    try {
      if (this.accessToken && this.idToken) {
        await this.fetchUserProfile();
        this.scheduleTokenRefresh();
      } else {
        this.logout();
      }
    } catch (error) {
      runInAction(() => {
        this.inProgress = false;
        this.baseLoad = false;
        this.setSignedIn(false);
      });
      console.log("[AuthStore] Failed to get user profile:", error);
      return this.logout();
    } finally {
      runInAction(() => {
        this.inProgress = false;
        this.baseLoad = false;
        this.signingIn = false;
      });
    }
  }

  public async logout() {
    if (this.loggingOut) return;
    this.loggingOut = true;
    try {
      if (this.accessToken && this.idToken) {
        await services.authService.logout();
      }
    } catch (error) {
      console.error("[AuthStore] Failed to logout:", error);
    } finally {
      runInAction(() => {
        this.forgetUser();
        this.clearSessionTokens(true);
        this.stopTokenRefresh();
        this.loggingOut = false;
      });
    }
  }

  public clearSessionTokens(preserveConfirmationToken: boolean = false) {
    if (!preserveConfirmationToken) {
      this.confirmationToken = null;
      clearAuthTokenCookie(AuthTokenType.Confirmation);
    }
    this.accessToken = null;
    this.idToken = null;
    this.refreshToken = null;
    this.authToken = null;
    this.userSignedIn = false;
    this.resetPasswordToken = null;
    clearAuthTokenCookie(AuthTokenType.PasswordReset);
    clearSessionCookies();
  }

  public setTokens(result: LoginResult) {
    let sessionData: SessionData = {
      accessToken: "",
      idToken: "",
      refreshToken: "",
      authToken: "",
    };

    const existingSessionData = getSessionCookies();
    if (existingSessionData) {
      const parsedData = JSON.parse(existingSessionData) as SessionData;
      sessionData = { ...sessionData, ...parsedData };
    }

    sessionData.accessToken = result.accessToken || sessionData.accessToken;
    sessionData.idToken = result.idToken || sessionData.idToken;
    sessionData.refreshToken = result.refreshToken || sessionData.refreshToken;
    sessionData.authToken = result.authToken || sessionData.authToken;

    setSessionCookies(JSON.stringify(sessionData), 3000, 7);

    runInAction(() => {
      this.accessToken = result.accessToken;
      this.idToken = result.idToken;
      if (result.refreshToken) this.refreshToken = result.refreshToken || null;
      if (result.authToken) this.authToken = result.authToken || null;
      this.userSignedIn = true;
    });
  }

  public async fetchUserProfile() {
    try {
      const userResponse = await this.userStore.fetchUserProfile();
      if (!userResponse) {
        throw new Error("[AuthStore] Failed to fetch user profile");
      }
      const profile = this.userStore;
      this.setUserProfile(profile);
    } catch (error) {
      console.error("[AuthStore] Failed to fetch user profile:", error);
      this.logout();
    }
  }

  private setUserProfile(profile: any) {
    this.userProfile = profile;
  }

  private loadTokensFromSession() {
    const sessionData = getSessionCookies();
    if (sessionData) {
      const { accessToken, idToken, refreshToken, authToken } = JSON.parse(sessionData) as SessionData;
      runInAction(() => {
        this.accessToken = accessToken;
        this.idToken = idToken;
        this.refreshToken = refreshToken;
        this.authToken = authToken;
        this.userSignedIn = !!refreshToken;
      });
    }
  }

  private async refreshTokens() {
    if (!this.refreshToken) {
      console.error("[AuthStore] Refresh token missing");
      throw new Error("No refresh token available");
    }

    try {
      const result = await services.authService.refreshToken(this.refreshToken);
      console.log("[AuthStore] Token refresh successful");
      if (result.accessToken && result.idToken) {
        this.setTokens(result);
        this.scheduleTokenRefresh();
        this.fetchUserProfile();
      } else {
        throw new Error("[AuthStore] Invalid token response");
      }
    } catch (error) {
      console.error("[AuthStore] Token refresh failed:", error);
      this.logout();
    }
  }

  private forgetUser() {
    this.userProfile = undefined;
  }

  private setSignedIn(signedIn: boolean) {
    this.userSignedIn = signedIn;
  }

  private scheduleTokenRefresh() {
    this.stopTokenRefresh();
    console.log("[AuthStore] Scheduling token refresh in", this.refreshInterval / 1000, "seconds.");

    this.tokenRefreshTimeout = setTimeout(async () => {
      try {
        await this.refreshTokens();
      } catch {
        this.logout();
      }
    }, this.refreshInterval);
  }

  private stopTokenRefresh() {
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }
  }
}

export default AuthStore;
