import { TASK_STATUSES, type TaskFilters } from "@/types/task";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import DatePresets from "./DatePresets";
import DateRange from "./DateTrigger";
import { formatDayMonth } from "@/utils/date";
import DateRangePicker from "../TaskForm/DateRangePicker";
import CategoryCombobox from "../TaskForm/CategoryCombobox";
import { UserCombobox } from "./UserCombobox";

type Props = {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
};

function FiltersBar({ filters, onChange }: Props) {
  return (
    <div className="p-3 px-8 flex flex-wrap gap-3 border-b border-gray-200">
      <DatePresets
        date_from={filters.date_from}
        date_to={filters.date_to}
        onChange={({ date_from, date_to }) => {
          onChange({ ...filters, date_from, date_to });
        }}
      />

      <DateRangePicker
        from={filters.date_from}
        to={filters.date_to}
        onChange={(range) => onChange({ ...filters, date_from: range.from, date_to: range.to })}
      >
        <DateRange from={formatDayMonth(filters.date_from)} to={formatDayMonth(filters.date_to)} />
      </DateRangePicker>

      <CategoryCombobox
        categoryId={filters.category_id}
        onChange={(id) => {
          onChange({ ...filters, category_id: id });
        }}
      />

      <UserCombobox
        userId={filters.id_user}
        onChange={(id) => onChange({ ...filters, id_user: id })}
      />

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
