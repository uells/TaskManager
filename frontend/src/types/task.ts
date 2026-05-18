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
  channel: string;
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
