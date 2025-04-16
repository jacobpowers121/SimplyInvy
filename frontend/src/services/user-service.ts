import ApiBase from "@/services/api-base";
import { UserProfileResponse } from "@/types/users/profile.type";

interface GenericUserResponse {
  success: boolean;
  message?: string;
  [key: string]: any;
}

class UserService extends ApiBase {
  private readonly apiUrl: string;

  constructor() {
    super();
    this.apiUrl = "/v1/users";
  }

  public async getProfile(): Promise<UserProfileResponse> {
    try {
      return await this.get<UserProfileResponse>(`${this.apiUrl}/profile`);
    } catch (error: any) {
      console.error("[Error fetching profile:", error);
      throw error;
    }
  }
}

export default UserService;
