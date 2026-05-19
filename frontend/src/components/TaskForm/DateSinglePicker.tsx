import { ru } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, parseISO } from "date-fns";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  disabledHandle?: (date: Date) => boolean;
  dateFromForm: string | null;
  onChange: (date: string | null) => void;
};

function DateSinglePicker({
  children,
  disabledHandle = () => false,
  dateFromForm,
  onChange,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={ru}
          mode="single"
          numberOfMonths={1}
          disabled={disabledHandle}
          selected={dateFromForm ? parseISO(dateFromForm) : undefined}
          onSelect={(date: Date | undefined) => {
            onChange(date ? format(date, "yyyy-MM-dd") : null);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DateSinglePicker;
