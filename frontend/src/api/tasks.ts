import type { Task, TaskCreate, TaskFilters, TaskStatus } from "@/types/task";
import type { AuthRequest } from "../hooks/useApi";

export async function getTask(
  page: number,
  limit: number,
  filters: TaskFilters,
  authRequest: AuthRequest,
): Promise<{ items: Task[]; total: number }> {
  const offset = (page - 1) * limit;
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("offset", String(offset));
  if (filters.status) params.set("status", String(filters.status));
  if (filters.date_from) params.set("date_from", filters.date_from);
  if (filters.date_to) params.set("date_to", filters.date_to);
  if (filters.id_user) params.set("id_user", String(filters.id_user));
  if (filters.category_id) params.set("category_id", String(filters.category_id));

  const data = await authRequest<{ total: number; items: Task[] }>(`/task?${params.toString()}`);
  return data;
}

export async function createTask(formdata: TaskCreate, authRequest: AuthRequest): Promise<Task> {
  const data = await authRequest<Task>("/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  });
  return data;
}

export async function deleteTask(id: number, authRequest: AuthRequest): Promise<void> {
  await authRequest<void>(`/task/${id}`, {
    method: "DELETE",
  });
}

export async function updateTask(
  id: number,
  updatedInfo: TaskCreate,
  authRequest: AuthRequest,
): Promise<Task> {
  const data = await authRequest<Task>(`/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedInfo),
  });
  return data;
}

export async function updateStatus(
  id: number,
  newStatus: TaskStatus,
  authRequest: AuthRequest,
): Promise<Task> {
  const data = await authRequest<Task>(`/task/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });
  return data;
}
