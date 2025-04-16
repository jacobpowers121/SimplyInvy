import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import stores from "@/stores";
import { AuthTokenType, getAuthTokenCookie, getSessionCookies } from "@/utils/auth";

const BASE_API_URL = import.meta.env.VITE_APP_API_BASE_URL;

class ApiBase {
  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          stores.authStore.logout();
        }
        return Promise.reject(error);
      },
    );
  }

  private async getTokenFromCookie(key: string): Promise<string | null> {
    const cookieData = getSessionCookies();
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      return parsedData[key] || null;
    }
    return null;
  }

  public async commonHeaders(): Promise<AxiosHeaders> {
    const headers = new AxiosHeaders();
    headers.set("Content-Type", "application/json");

    try {
      const tokens = await Promise.all([
        this.getTokenFromCookie("idToken"),
        this.getTokenFromCookie("authToken"),
        this.getTokenFromCookie("accessToken"),
        getAuthTokenCookie(AuthTokenType.Confirmation),
        getAuthTokenCookie(AuthTokenType.PasswordReset),
      ]);

      const [idToken, authToken, accessToken, confirmationToken, resetPasswordToken] = tokens;

      if (idToken && authToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
        headers.set("X-Access-Token", `Bearer ${accessToken}`);
        headers.set("X-Auth-Token", authToken);
      } else if (confirmationToken || resetPasswordToken) {
        const tokenToUse = confirmationToken || resetPasswordToken;
        headers.set("Authorization", `Bearer ${tokenToUse}`);
      }
    } catch (error) {
      console.error("Error getting tokens with retry:", error);
    }
    return headers;
  }

  public async get<T>(
    url: string,
    params?: object,
    options?: AxiosRequestConfig,
  ): Promise<T & { success: boolean; status: number; data: Record<string, any> }> {
    try {
      const headers = await this.commonHeaders();
      const config: AxiosRequestConfig = {
        baseURL: BASE_API_URL,
        headers,
        params,
        ...options,
      };

      const response = await axios.get<T>(url, config);

      const { data, statusCode, success } = response.data as {
        data: T;
        statusCode: number;
        success: boolean;
      };

      return {
        data,
        success,
        status: statusCode,
      } as T & { success: boolean; status: number; data: Record<string, any> };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          ...(error.response.data || {}),
          success: false,
          status: error.response.status,
        };
      }
      console.error("Unexpected error in API call:", error);
      throw {
        data: null,
        success: false,
        error: error.message,
        status: 0,
      };
    }
  }

  public async post<T>(
    url: string,
    body: any,
    options?: AxiosRequestConfig,
  ): Promise<T & { success: boolean; status: number }> {
    try {
      const headers = await this.commonHeaders();
      const config: AxiosRequestConfig = {
        baseURL: BASE_API_URL,
        headers,
        withCredentials: true,
        ...options,
      };

      const response = await axios.post<T>(url, body, config);

      const { data, statusCode, success } = response.data as {
        data: T;
        statusCode: number;
        success: boolean;
      };

      return {
        ...data,
        success,
        status: statusCode,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          ...(error.response.data || {}),
          success: false,
          status: error.response.status,
        };
      }
      console.error("Unexpected error in API call:", error);
      throw {
        success: false,
        error: error.message,
        status: 0,
      };
    }
  }

  public async put<T>(
    url: string,
    body: any,
    options?: AxiosRequestConfig,
  ): Promise<T & { success: boolean; status: number }> {
    try {
      const headers = await this.commonHeaders();
      const config: AxiosRequestConfig = {
        baseURL: BASE_API_URL,
        headers,
        withCredentials: true,
        ...options,
      };

      const response = await axios.put<T>(url, body, config);

      const { data, statusCode, success } = response.data as {
        data: T;
        statusCode: number;
        success: boolean;
      };

      return {
        ...data,
        success: success,
        status: statusCode,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          ...(error.response.data || {}),
          success: false,
          status: error.response.status,
        };
      }
      console.error("Unexpected error in API call:", error);
      throw {
        success: false,
        error: error.message,
        status: 0,
      };
    }
  }

  public async patch<T>(
    url: string,
    body: any,
    options?: AxiosRequestConfig,
  ): Promise<{ data: T; success: boolean; status: number }> {
    try {
      const headers = await this.commonHeaders();
      const config: AxiosRequestConfig = {
        baseURL: BASE_API_URL,
        headers,
        withCredentials: true,
        ...options,
      };

      const response = await axios.patch<T>(url, body, config);

      const { data, statusCode, success } = response.data as {
        data: T;
        statusCode: number;
        success: boolean;
      };

      return {
        data,
        success,
        status: statusCode,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          ...(error.response.data || {}),
          success: false,
          status: error.response.status,
        };
      }
      console.error("Unexpected error in API call:", error);
      throw {
        success: false,
        error: error.message,
        status: 0,
      };
    }
  }

  public async delete<T>(url: string, options?: AxiosRequestConfig): Promise<T & { success: boolean; status: number }> {
    try {
      const headers = await this.commonHeaders();
      const config: AxiosRequestConfig = {
        baseURL: BASE_API_URL,
        headers,
        withCredentials: true,
        ...options,
      };

      const response = await axios.post<T>(url, config);

      const { data, statusCode, success } = response.data as {
        data: T;
        statusCode: number;
        success: boolean;
      };

      return {
        ...data,
        success: success,
        status: statusCode,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          ...(error.response.data || {}),
          success: false,
          status: error.response.status,
        };
      }
      console.error("Unexpected error in API call:", error);
      throw {
        success: false,
        error: error.message,
        status: 0,
      };
    }
  }
}

export default ApiBase;
