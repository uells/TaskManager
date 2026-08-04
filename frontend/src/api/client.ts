const BASE_URL = "http://localhost:8000/api/v1";

const ERROR_MSG: Record<number, string> = {
  401: "Сессия истекла",
  422: "Неверный формат данных",
  500: "Ошибка сервера, попробуйте позже",
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(BASE_URL + path, options);
  if (!response.ok) {
    const message = ERROR_MSG[response.status] ?? "Неизвестная ошибка";
    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json();
  return data;
}
