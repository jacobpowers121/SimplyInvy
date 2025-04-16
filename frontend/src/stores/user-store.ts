import { makeAutoObservable, runInAction } from "mobx";
import services from "@/services";

class UserStore {
  profile: any = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isProfileLoaded() {
    return !!this.profile;
  }

  get userProfileInfo() {
    if (!this.profile) return null;

    return {
      name: this.profile.user.name,
      email: this.profile.user.email,
      phoneNumber: this.profile.user.phoneNumber,
      roles: this.profile.user.roles.join(","),
      userStatus: {
        lastActive: this.profile.userStatus.lastActive,
      },
    };
  }

  setProfile(profile: any) {
    this.profile = profile;
  }

  clearProfile() {
    this.setProfile(null);
    this.loading = false;
    this.error = null;
  }

  public async fetchUserProfile() {
    this.loading = true;
    this.error = null;
    try {
      const response = await services.userService.getProfile();
      runInAction(() => {
        this.setProfile(response.data);
        this.loading = false;
      });
      return true;
    } catch (error: any) {
      runInAction(() => {
        this.error = "Failed to fetch user profile";
        this.loading = false;
      });
      console.error("[UserStore] Error fetching profile:", error);
      return false;
    }
  }
}

export default UserStore;
