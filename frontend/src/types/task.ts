import type { Category } from "./category";
import type { User } from "./user";

export const TASK_STATUSES = ["Не начато", "В работе", "Завершено"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_CHANNELS = ["Мессенджер", "Почта", "Личное обращение"] as const;
export type TaskChannel = (typeof TASK_CHANNELS)[number];

export type Task = {
  id: number;
  date_begin: string;
  date_fact_end: string | null;
  date_plan_end: string | null;
  category_id: number | null;
  author: string;
  name: string;
  description: string;
  link: string | null;
  channel: TaskChannel;
  status: TaskStatus;
  id_parent_task: number | null;
  category: Category | null;
  users: User[];
};

export type TaskCreate = {
  name: string;
  description: string;
  author: string;
  date_begin: string;
  date_plan_end: string | null;
  date_fact_end: string | null;
  status: TaskStatus;
  channel: TaskChannel;
  category_id: number;
  user_ids: number[];
  link: string;
  id_parent_task: number | null;
};

export type TaskFilters = {
  status: string | null;
  date_from: string | null;
  date_to: string | null;
  id_user: number | null;
  category_id: number | null;
};

export function taskToFormData(task: Task): TaskCreate {
  return {
    name: task.name,
    description: task.description,
    author: task.author,
    date_begin: task.date_begin,
    date_plan_end: task.date_plan_end,
    date_fact_end: task.date_fact_end,
    status: task.status,
    channel: task.channel,
    category_id: task.category?.id ?? 0,
    user_ids: task.users.map((u) => u.id),
    link: task.link ?? "",
    id_parent_task: task.id_parent_task,
  };
}

export function nextStatus(currentStatus: TaskStatus) {
  const newStatusIndex = (TASK_STATUSES.indexOf(currentStatus) + 1) % TASK_STATUSES.length;
  return TASK_STATUSES[newStatusIndex];
}
