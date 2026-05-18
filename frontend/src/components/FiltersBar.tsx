import { TASK_STATUSES, type TaskFilters } from "@/types/task";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
};

function FiltersBar({ filters, onChange }: Props) {
  return (
    <div className="p-3 px-8 border-b border-gray-200">
      <Select
        value={filters.status ?? ""}
        onValueChange={(newStatus: string) => {
          onChange({ ...filters, status: newStatus === "all" ? null : newStatus });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Cтатус" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все статусы</SelectItem>
          {TASK_STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FiltersBar;
