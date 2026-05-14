import { formateDate } from "../../utils/date";

type Props = {
  label: string;
  date: string;
};

function DateLabel({ label, date }: Props) {
  return (
    <span className="flex gap-1.5 text-xs uppercase font-semibold text-gray-300">
      {label}
      <time className="text-gray-500 font-medium" dateTime={date}>
        {formateDate(date)}
      </time>
    </span>
  );
}

export default DateLabel;
