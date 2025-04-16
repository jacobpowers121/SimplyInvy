import ApiBase from "@/services/api-base";
import { LoginResult } from "@/types/auth/login.types";
import { CreateUserRequest } from "@/types/auth/register.types";

class AuthService extends ApiBase {
  private readonly apiUrl: string;

  constructor() {
    super();
    this.apiUrl = "/v1/auth/user";
  }

  public async register(createUserRequest: CreateUserRequest): Promise<any> {}

  public async login(username: string, password: string): Promise<LoginResult> {
    const payload = {
      username,
      password,
    };
    return await this.post<LoginResult>(`${this.apiUrl}/login`, payload);
  }

  public async logout(): Promise<void> {
    await this.post(`${this.apiUrl}/logout`, {});
  }

  public async refreshToken(refreshToken: string): Promise<LoginResult> {
    const payload = {
      refreshToken,
    };
    return await this.post<LoginResult>(`${this.apiUrl}/refresh-token`, payload);
  }
}

export default AuthService;
