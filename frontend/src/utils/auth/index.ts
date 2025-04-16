import Cookies from "js-cookie";

const COOKIE_PREFIX = "__session_part__";
const CONFIRMATION_TOKEN_COOKIE = "__confirmation_token__";
const PASSWORD_RESET_TOKEN_SOOKIE = "__password_reset_token__";

export enum AuthTokenType {
  Confirmation = "confirmation",
  PasswordReset = "passwordReset",
}

function combineData(chunks: string[]): string {
  return chunks.join("");
}

function splitData(data: string, chunkSize: number): string[] {
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
}

export function setSessionCookies(data: string, chunkSize: number, expires: number) {
  const chunks = splitData(data, chunkSize);
  chunks.forEach((chunk, index) => {
    Cookies.set(`${COOKIE_PREFIX}${index}`, chunk, {
      expires,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  });
}

export function getSessionCookies(): string | null {
  const cookies = Object.entries(Cookies.get());
  const sessionChunks = cookies
    .filter(([key]) => key.startsWith(COOKIE_PREFIX))
    .sort(([a], [b]) => parseInt(a.replace(COOKIE_PREFIX, ""), 10) - parseInt(b.replace(COOKIE_PREFIX, ""), 10))
    .map(([, value]) => value);
  return sessionChunks.length > 0 ? combineData(sessionChunks) : null;
}

export function clearSessionCookies() {
  Object.keys(Cookies.get()).forEach((key) => {
    if (key.startsWith(COOKIE_PREFIX)) {
      Cookies.remove(key);
    }
  });
}

export const getCookieName = (tokenType: AuthTokenType): string => {
  return tokenType === "confirmation" ? CONFIRMATION_TOKEN_COOKIE : PASSWORD_RESET_TOKEN_SOOKIE;
};

export const setAuthTokenCookie = (tokenType: AuthTokenType, token: string, expires: number) => {
  const cookieName = getCookieName(tokenType);
  Cookies.set(cookieName, token, {
    expires,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const getAuthTokenCookie = (tokenType: AuthTokenType): string | undefined => {
  const cookieName = getCookieName(tokenType);
  return Cookies.get(cookieName);
};

export const clearAuthTokenCookie = (tokenType: AuthTokenType) => {
  const cookieName = getCookieName(tokenType);
  Cookies.remove(cookieName);
};
