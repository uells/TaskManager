import { addDays, format, parseISO, startOfWeek } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ru } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  from: string | null;
  to: string | null;
  onChange: (range: { from: string | null; to: string | null }) => void;
};

function DateRangePicker({ children, from, to, onChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Card>
          <CardContent>
            <Calendar
              locale={ru}
              mode="range"
              numberOfMonths={1}
              selected={{
                from: from ? parseISO(from) : undefined,
                to: to ? parseISO(to) : undefined,
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

export default DateRangePicker;
