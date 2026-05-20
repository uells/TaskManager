import type { AuthRequest } from "@/hooks/useApi";
import type { User } from "@/types/user";

export async function getUsers(authRequest: AuthRequest): Promise<User[]> {
  const data = await authRequest<User[]>("/user");
  return data;
}

const LIMIT = 10;
export async function getAuthors(query: string, authRequest: AuthRequest): Promise<string[]> {
  const params = new URLSearchParams();
  params.append("search", query);
  params.append("limit", String(LIMIT));
  const data = await authRequest<string[]>(`/task/authors?${params}`);
  return data;
}
