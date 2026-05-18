import Pagination from "./ui/Pagination";
import TaskBoard from "./TaskBoard";
import FullForm from "./TaskForm/FullForm";
import type { Task, TaskFilters } from "../types/task";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import { ListPlus } from "lucide-react";
import FiltersBar from "./FiltersBar";

const ERROR_MASSAGES: Record<number, string> = {
  401: "Сессия истекла",
  422: "Неверный формат данных",
  500: "Ошибка сервера, попробуйте позже",
};

function TaskPage() {
  const [filters, setFilters] = useState<TaskFilters>({
    status: null,
    date_from: null,
    date_to: null,
    id_user: null,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addFormIsOpen, setAddFormIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { token } = useAuth();
  const LIMIT = 8;

  const fetchTask = async () => {
    try {
      const offset = (page - 1) * LIMIT;
      const params = new URLSearchParams();
      params.set("limit", String(LIMIT));
      params.set("offset", String(offset));
      if (filters.status) params.set("status", String(filters.status));
      if (filters.date_from) params.set("date_from", filters.date_from);
      if (filters.date_to) params.set("date_to", filters.date_to);
      if (filters.id_user) params.set("id_user", String(filters.id_user));

      const response = await fetch(`http://localhost:8000/api/v1/task?${params.toString()}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        setError(ERROR_MASSAGES[response.status] ?? "Что-то пошло не так");
      } else {
        const data = await response.json();
        setTasks(data.items);
        setTotal(data.total);
      }
    } catch (e) {
      console.error("Failed to fetch tasks:", e);
      setError("Не удалось загрузить задачи");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: TaskFilters) => {
    setFilters(newFilter);
    setPage(1);
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchTask();
    return () => {
      setError(null);
      setLoading(false);
    };
  }, [page, filters]);

  if (loading)
    return <div className="text-4xl align-middle font-bold text-gray-400">Загрузка...</div>;
  if (error) return <div className="text-4xl align-middle font-bold text-gray-400">{error}</div>;

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 min-h-0">
        <FiltersBar filters={filters} onChange={handleFilterChange} />
        {tasks && <TaskBoard total={total} tasks={tasks} />}
        <Pagination total={total} limit={LIMIT} page={page} onPageChange={setPage} />
      </div>
      {!addFormIsOpen ? (
        <button
          className="border-top border-gray-400 cursor-pointer 
      shadow-md w-15 relative z-10 flex items-center justify-center"
          onClick={() => {
            setAddFormIsOpen(true);
          }}
        >
          <span className="inline-flex gap-3 uppercase -rotate-90 whitespace-nowrap text-base font-bold tracking-wider text-gray-400">
            <ListPlus /> Добавить
          </span>
        </button>
      ) : (
        <FullForm onSuccess={fetchTask} onClose={() => setAddFormIsOpen(false)} />
      )}
    </div>
  );
}

export default TaskPage;
