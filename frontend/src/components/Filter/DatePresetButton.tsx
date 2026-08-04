type Props = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

function DatePresetButton({ label, onClick, isActive }: Props) {
  return (
    <button
      type="button"
      className={`p-1 text-sm rounded-md text-gray-500 cursor-pointer border border-gray-200 shadow-xs
    ${isActive ? "bg-gray-900 text-white" : ""}  `}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default DatePresetButton;
