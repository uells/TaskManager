import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";
import DatePresetButton from "./DatePresetButton";

type DateRange = {
  date_from: string | null;
  date_to: string | null;
};

type Props = {
  date_from: string | null;
  date_to: string | null;
  onChange: (dates: DateRange) => void;
};

const BUTTONS = [
  {
    label: "Сегодня",
    getRange: () => {
      const today = format(new Date(), "yyyy-MM-dd");
      return {
        date_from: today,
        date_to: today,
      };
    },
  },
  {
    label: "Неделя",
    getRange: () => {
      const now = new Date();
      return {
        date_from: format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd"),
        date_to: format(endOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd"),
      };
    },
  },
  {
    label: "Месяц",
    getRange: () => {
      const now = new Date();
      return {
        date_from: format(startOfMonth(now), "yyyy-MM-dd"),
        date_to: format(endOfMonth(now), "yyyy-MM-dd"),
      };
    },
  },
];

const isActive = (rangeFromBtn: DateRange, rangeFromFilters: DateRange) => {
  return (
    rangeFromBtn.date_from === rangeFromFilters.date_from &&
    rangeFromBtn.date_to === rangeFromFilters.date_to
  );
};

function DatePresets({ date_from, date_to, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {BUTTONS.map((btn) => (
        <DatePresetButton
          key={btn.label}
          label={btn.label}
          isActive={isActive(btn.getRange(), { date_from, date_to })}
          onClick={() => {
            let range: DateRange = btn.getRange();
            if (isActive(range, { date_from, date_to })) {
              range = {
                date_from: null,
                date_to: null,
              };
            }
            onChange(range);
          }}
        />
      ))}
    </div>
  );
}

export default DatePresets;
