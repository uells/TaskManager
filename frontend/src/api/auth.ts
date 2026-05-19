import type { LoginResponse } from "@/types/login";
import { request } from "./client";

export async function login(username: string, password: string) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const data = await request<LoginResponse>("/auth/login", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: body,
  });
  return data.access_token;
}
