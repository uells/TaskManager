import { useAuth } from "../components/auth/AuthContext";
import { request } from "../api/client";

export type AuthRequest = <T>(path: string, options?: RequestInit) => Promise<T>;

export function useApi() {
  const { token } = useAuth();
  function authRequest<T>(path: string, options?: RequestInit): Promise<T> {
    return request<T>(path, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: "Bearer " + token,
      },
    });
  }
  return { authRequest };
}
