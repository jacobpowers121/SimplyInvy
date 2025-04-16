interface LoginResult {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  sessionId?: string;
  authToken?: string;
}

interface SessionData {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  authToken: string;
  confirmationToken?: string;
}

export type { LoginResult, SessionData };
