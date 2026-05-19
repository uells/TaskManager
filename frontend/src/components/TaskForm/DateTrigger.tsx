import { forwardRef } from "react";

type Props = {
  title: string;
  value: string | null;
};

const DateTrigger = forwardRef<HTMLButtonElement, Props>(({ title, value, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      type="button"
      className="flex flex-1 flex-col text-gray-900 font-semibold rounded-md border border-gray-200 text-sm gap-y-1 justify-center items-center p-2.5 cursor-pointer"
    >
      <span className="text-xs text-gray-500 font-normal uppercase">{title}</span>
      {value ? value : "Выбрать"}
    </button>
  );
});

export default DateTrigger;
