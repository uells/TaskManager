import type { AuthRequest } from "@/hooks/useApi";
import type { Category } from "@/types/category";

export async function getCategories(authRequest: AuthRequest): Promise<Category[]> {
  const data = await authRequest<Category[]>("/category");
  return data;
}

export async function createCategory(name: string, authRequest: AuthRequest): Promise<Category> {
  const data = await authRequest<Category>("/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return data;
}
