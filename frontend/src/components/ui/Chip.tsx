import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  text: string;
};

function Chip({ icon, text }: Props) {
  return (
    <span className="inline-flex gap-1.5 items-center py-1 px-3 border bg-gray-50 border-gray-200 text-gray-700 text-xs rounded-md">
      {icon}
      {text}
    </span>
  );
}

export default Chip;
