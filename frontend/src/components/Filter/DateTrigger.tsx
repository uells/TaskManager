import { CalendarDays } from "lucide-react";
import { forwardRef } from "react";

type Props = {
  from: string | null;
  to: string | null;
};

const DateTrigger = forwardRef<HTMLButtonElement, Props>(({ from, to, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className="p-1.5 flex gap-1 cursor-pointer text-gray-500 text-sm rounded-lg border border-gray-200"
    >
      <CalendarDays size={16} />
      {from && from}
      {to && " - " + to}
      {!(from && to) ? "Выбрать" : ""}
    </button>
  );
});

export default DateTrigger;
