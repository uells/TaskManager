import { ru } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, parseISO } from "date-fns";

type Props = {
  title: string;
  disabledHandle?: (date: Date) => boolean;
  dateFromForm: string | null;
  onChange: (date: string | null) => void;
};

function DateButton({ disabledHandle = () => false, dateFromForm, onChange, title }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex flex-1 flex-col text-gray-900 font-semibold rounded-md border border-gray-200
                text-sm gap-y-1 justify-center items-center p-2.5 cursor-pointer"
          type="button"
        >
          <span className="text-xs text-gray-500 font-normal uppercase">{title}</span>
          {dateFromForm ? format(parseISO(dateFromForm), "d MMM", { locale: ru }) : "Выбрать"}
        </button>
      </PopoverTrigger>
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

export default DateButton;
