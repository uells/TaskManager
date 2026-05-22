import { LayoutGrid, TableProperties } from "lucide-react";
import type { Task, TaskStatus } from "../types/task";
import { useState } from "react";
import TaskCard from "./TaskCard/TaskCard";

type Props = {
  total: number;
  tasks: Task[];
  onTaskDeleted: () => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (id: number, status: TaskStatus) => Promise<void>;
};

function TaskBoard({ tasks, total, onTaskDeleted, onEditTask, onStatusChange }: Props) {
  const view = localStorage.getItem("cardView") === "true";
  const [isCardView, setCardView] = useState(view);

  return (
    <div className="mx-8 mt-5 flex flex-col flex-1 min-h-0">
      <div className="mb-5 flex justify-between items-center">
        <div className="flex items-center gap-3.5 ">
          <h2 className="text-gray-900 text-base font-semibold">Список задач</h2>
          <span className="text-sm w-8 h-8 border border-gray-300 rounded-full flex justify-center items-center">
            {total}
          </span>
        </div>
        <div className="flex text-gray-400">
          <button
            onClick={() => {
              localStorage.setItem("cardView", "true");
              setCardView(true);
            }}
            className={`px-3 py-1.5 rounded-sm cursor-pointer transition-all border border-transparent
                ${isCardView ? "shadow-sm text-gray-900  border-gray-100" : ""}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => {
              localStorage.setItem("cardView", "false");
              setCardView(false);
            }}
            className={`px-3 py-1.5 rounded-sm cursor-pointer transition-all border border-transparent
                ${!isCardView ? "shadow-sm text-gray-900  border-gray-100" : ""}`}
          >
            <TableProperties size={18} />
          </button>
        </div>
      </div>
      {isCardView && (
        <div
          className="@container flex-1 overflow-y-auto scrollbar-thin 
        scrollbar-thumb-gray-300 scrollbar-track-transparent min-h-0"
        >
          <div className="justify-start grid grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4 gap-x-3 gap-y-5 py-0.5 pr-4">
            {tasks.map((task) => (
              <TaskCard
                onStatusChange={onStatusChange}
                onEdit={onEditTask}
                onDelete={onTaskDeleted}
                key={task.id}
                task={task}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskBoard;
