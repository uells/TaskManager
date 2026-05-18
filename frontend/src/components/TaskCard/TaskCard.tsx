import type { Task } from "../../types/task";
import StatusChip from "./StatusChip";
import Chip from "../ui/Chip";
import LinkBlock from "../ui/LinkBlock";
import DateLabel from "../ui/DateLabel";
import Avatar from "../ui/Avatar";
import TaskActions from "./TaskActions";
import { Mail, Tag, CornerDownRight } from "lucide-react";

type Props = {
  task: Task;
};

const STATUS_BORDER: Record<string, string> = {
  "В работе": "border-l-blue-500",
  Завершено: "border-l-green-500",
};

function TaskCard({ task }: Props) {
  const borderColor = STATUS_BORDER[task.status] || "border-l-gray-300";

  return (
    <div
      className={`group/card relative bg-white border-gray-200 rounded-lg p-4 shadow-sm flex 
        flex-col gap-y-2.5 border-l-4 ${borderColor}`}
    >
      <div className="grid grid-cols-[1fr_auto] items-start gap-1">
        <div className="flex flex-wrap gap-2">
          <StatusChip status={task.status} />
          <Chip text={task.channel} icon={<Mail size={10} />} />
          {task.category && <Chip text={task.category.name} icon={<Tag size={10} />} />}
        </div>
        <TaskActions />
      </div>

      <h3 className="text-gray-900 text-sm font-semibold leading-[1.45]">{task.description}</h3>
      {task.link && <LinkBlock link={task.link} />}

      <div className="flex gap-3 flex-wrap">
        <DateLabel label="Нач" date={task.date_begin} />
        {task.date_plan_end && <DateLabel label="План" date={task.date_plan_end} />}
        {task.date_plan_end && <DateLabel label="Факт" date={task.date_plan_end} />}
      </div>
      <div className="border-t border-gray-200 pt-2 grid grid-cols-2">
        <div className="flex flex-col justify-between">
          <span className="text-xs uppercase font-semibold text-gray-300 mb-2">Исполнители</span>
          <div className="flex -space-x-1 space-y-1 flex-wrap">
            {task.users.map((user) => (
              <Avatar key={user.id} fio={user.fio} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase font-semibold text-gray-300 mb-2">Автор запроса</span>
          <span className="text-gray-400 text-xs font-semibold">{task.author}</span>
        </div>
      </div>
      {task.category && (
        <div className="text-gray-400 text-xs font-semibold">
          <CornerDownRight size={14} className="inline mr-1" />
          {task.category?.name}
        </div>
      )}
    </div>
  );
}

export default TaskCard;
