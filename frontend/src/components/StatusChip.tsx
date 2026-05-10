type Props = {
  status: string;
  onClick?: () => void;
};

const STATUS_COLORS: Record<string, string> = {
  "В работе": "bg-blue-200 text-blue-700",
  Завершено: "bg-green-200 text-green-700",
};
const STATUS_DOT: Record<string, string> = {
  "В работе": "bg-blue-700",
  Завершено: "bg-green-700",
};

function StatusChip({ status, onClick }: Props) {
  const colorClass = STATUS_COLORS[status] || "bg-gray-100 text-gray-700";
  const colorDot = STATUS_DOT[status] || "bg-gray-700";
  return (
    <button
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
