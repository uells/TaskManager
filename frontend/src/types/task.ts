import type { Category } from "./category";
import type { User } from "./user";

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
    status: string;
    id_parent_task: number | null;
    category: Category | null;
    users: User[];
}

