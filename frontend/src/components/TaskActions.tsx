import { SquarePen, Trash2, Check, X } from "lucide-react";
import { useEffect, useState } from "react";

function TaskActions() {
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    if (!confirm) return;
    const timeoutId = setTimeout(() => {
      setConfirm(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [confirm]);

  return (
    <div
      className="relative flex gap-1 opacity-0
        group-hover/card:opacity-100 transition-opacity"
    >
      {!confirm && (
        <>
          <button className="cursor-pointer">
            <SquarePen size={18} className="text-gray-400" />
          </button>
          <button onClick={() => setConfirm(true)} className="cursor-pointer">
            <Trash2 size={18} className="text-red-400" />
          </button>
        </>
      )}
      {confirm && (
        <>
          <button className="cursor-pointer relative z-1">
            <Check className="text-green-400" size={18} />
          </button>
          <button onClick={() => setConfirm(false)} className="cursor-pointer relative z-1">
            <X className="text-red-400" size={18} />
          </button>
          <div className="absolute -inset-1 z-0 rounded-sm bg-green-100 origin-left animate-shrink"></div>
        </>
      )}
    </div>
  );
}

export default TaskActions;
