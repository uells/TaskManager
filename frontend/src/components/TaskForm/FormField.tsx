import type { ReactNode } from "react";

type Props = {
  label: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
};

function FormField({ label, required, htmlFor, children }: Props) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={htmlFor} className="uppercase text-xs text-gray-500">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

export default FormField;
