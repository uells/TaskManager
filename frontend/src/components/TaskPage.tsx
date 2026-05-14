import Pagination from "./Pagination";
import TaskBoard from "./TaskBoard";
import FullForm from "./TaskForm/FullForm";
import type { Task } from "../types/task";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import { ListPlus } from "lucide-react";

const ERROR_MASSAGES: Record<number, string> = {
  401: "Сессия истекла",
  422: "Неверный формат данных",
  500: "Ошибка сервера, попробуйте позже",
};

function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addFormIsOpen, setAddFormIsOpen] = useState(false);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/task", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!response.ok) {
          setError(ERROR_MASSAGES[response.status] ?? "Что-то пошло не так");
        } else {
          const data = await response.json();
          setTasks(data);
        }
      } catch (e) {
        console.error("Failed to fetch tasks:", e);
        setError("Не удалось загрузить задачи");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      setError(null);
      setLoading(false);
    };
  }, []);

  if (loading)
    return <div className="text-4xl align-middle font-bold text-gray-400">Загрузка...</div>;
  if (error) return <div className="text-4xl align-middle font-bold text-gray-400">{error}</div>;

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="h-30 mx-8 my-4 bg-gray-200 shrink-0"></div>
        {tasks && <TaskBoard tasks={tasks}></TaskBoard>}
        <Pagination />
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
        <FullForm onClose={() => setAddFormIsOpen(false)} />
      )}
    </div>
  );
}

export default TaskPage;
