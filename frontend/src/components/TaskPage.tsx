import Pagination from "./ui/Pagination";
import TaskBoard from "./TaskBoard";
import FullForm from "./TaskForm/FullForm";
import type { Task, TaskFilters } from "../types/task";
import { useState } from "react";
import { ListPlus } from "lucide-react";
import FiltersBar from "./Filter/FiltersBar";
import { useTask } from "@/hooks/useTask";

function TaskPage() {
  const [filters, setFilters] = useState<TaskFilters>({
    status: null,
    date_from: null,
    date_to: null,
    id_user: null,
    category_id: null,
  });
  const [addFormIsOpen, setAddFormIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const { tasks, total, loading, error, refetch } = useTask(page, limit, filters);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleFilterChange = (newFilter: TaskFilters) => {
    setFilters(newFilter);
    setPage(1);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
    setPage(1);
  };

  if (loading)
    return <div className="text-4xl align-middle font-bold text-gray-400">Загрузка...</div>;
  if (error) return <div className="text-4xl align-middle font-bold text-gray-400">{error}</div>;

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 min-h-0">
        <FiltersBar filters={filters} onChange={handleFilterChange} />
        <TaskBoard
          onEditTask={setEditingTask}
          onTaskDeleted={refetch}
          total={total}
          tasks={tasks}
        />
        <Pagination
          total={total}
          limit={limit}
          page={page}
          onPageChange={setPage}
          onLimitChange={handleLimitChange}
        />
      </div>
      {addFormIsOpen || editingTask ? (
        <FullForm
          key={editingTask?.id ?? "new"}
          task={editingTask ?? undefined}
          onSuccess={() => {
            setAddFormIsOpen(false);
            setEditingTask(null);
            refetch();
          }}
          onClose={() => {
            setAddFormIsOpen(false);
            setEditingTask(null);
          }}
        />
      ) : (
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
      )}
    </div>
  );
}

export default TaskPage;
