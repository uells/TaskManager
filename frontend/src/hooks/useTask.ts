import type { Task, TaskFilters } from "@/types/task";
import { useApi } from "./useApi";
import { getTask } from "@/api/tasks";
import { ApiError } from "@/api/client";
import { useEffect, useState } from "react";

export function useTask(page: number, limit: number, filters: TaskFilters) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const { authRequest } = useApi();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTask(page, limit, filters, authRequest);
        setTotal(data.total);
        setTasks(data.items);
      } catch (e) {
        if (e instanceof ApiError) {
          setError(e.message);
        } else {
          setError("Не удалось загрузить задачи");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
    return () => {
      setError(null);
      setLoading(false);
    };
  }, [filters, limit, page, refetchIndex]);

  const refetch = () => setRefetchIndex((n) => n + 1);
  return { tasks, total, loading, error, refetch };
}
