import type { TaskStatus } from "../../types/task";

type Props = {
  isActive?: boolean;
  status: TaskStatus;
  onClick?: () => void;
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  "В работе": "bg-blue-200 text-blue-700 border border-blue-400",
  Завершено: "bg-green-200 text-green-700 border border-green-400",
  "Не начато": "bg-gray-100 text-gray-700 border border-gray-400",
};
const STATUS_DOT: Record<TaskStatus, string> = {
  "В работе": "bg-blue-700",
  Завершено: "bg-green-700",
  "Не начато": "bg-gray-700",
};

const FALLBACK_COLOR = "bg-gray-200 text-gray-700 border-gray-700";
const FALLBACK_DOT = "bg-gray-700";

const DEACTIVE_COLOR = "text-200 border border-gray-200";
const DEACTIVE_DOT = "bg-gray-200";

function StatusChip({ isActive = true, status, onClick }: Props) {
  const colorClass = isActive ? STATUS_COLORS[status] || FALLBACK_COLOR : DEACTIVE_COLOR;
  const colorDot = isActive ? STATUS_DOT[status] || FALLBACK_DOT : DEACTIVE_DOT;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 cursor-pointer
         text-xs font-semibold rounded-full ${colorClass}`}
    >
      <span className={`w-2 h-2 rounded-full ${colorDot}`}></span>
      {status}
    </button>
  );
}

export default StatusChip;
