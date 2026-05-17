import { addDays, format, parseISO, startOfWeek } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ru } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

type Props = {
  dateBegin: string | null;
  datePlanEnd: string | null;
  onChange: (range: { from: string | null; to: string | null }) => void;
};

function DateRangeButton({ dateBegin, datePlanEnd, onChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex flex-1 flex-col text-gray-900 font-semibold rounded-md border border-gray-200
                text-sm gap-y-1 justify-center items-center p-2.5 cursor-pointer"
          type="button"
        >
          <span className="text-xs text-gray-500 font-normal uppercase">Нач</span>
          {dateBegin ? format(parseISO(dateBegin), "d MMM", { locale: ru }) : "Выбрать"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Card>
          <CardContent>
            <Calendar
              locale={ru}
              mode="range"
              numberOfMonths={1}
              selected={{
                from: dateBegin ? parseISO(dateBegin) : undefined,
                to: datePlanEnd ? parseISO(datePlanEnd) : undefined,
              }}
              onSelect={(range: DateRange | undefined) => {
                onChange({
                  from: range?.from ? format(range.from, "yyyy-MM-dd") : null,
                  to: range?.to ? format(range.to, "yyyy-MM-dd") : null,
                });
              }}
            />
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 border-t">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => {
                const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
                const friday = addDays(monday, 4);
                onChange({
                  from: format(monday, "yyyy-MM-dd"),
                  to: format(friday, "yyyy-MM-dd"),
                });
              }}
            >
              Неделя
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

export default DateRangeButton;
