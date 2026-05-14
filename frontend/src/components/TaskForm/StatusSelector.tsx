import { TASK_STATUSES, type TaskStatus } from "../../types/task";
import StatusChip from "../TaskCard/StatusChip";

type Props = {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
};

function StatusSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {TASK_STATUSES.map((status) => (
        <StatusChip
          key={status}
          status={status}
          isActive={value === status}
          onClick={() => onChange(status)}
        />
      ))}
    </div>
  );
}

export default StatusSelector;
