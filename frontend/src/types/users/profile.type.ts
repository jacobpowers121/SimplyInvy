interface UserProfileResponse {
  data: {
    user: {
      email: string;
      name: string;
      phoneNumber: string;
      roles: string[];
    };
    status: {
      lastActive: string;
    };
  };
}

export type { UserProfileResponse };
