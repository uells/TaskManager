import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
};

function Pagination({ total, page, limit, onPageChange }: Props) {
  const totalPages = Math.ceil(total / limit);
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div
      className="shrink-0 px-8 h-16 border-t border-t-gray-100  
    flex items-center justify-between text-sm text-gray-500"
    >
      <span>
        Показано {total === 0 ? 0 : from}-{to} из {total}
      </span>
      <div className="flex gap-2 items-center ">
        <span>На странице: {limit}</span>
        <div className="gap-1 flex ml-5">
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => onPageChange(page - 1)}
            className="cursor-pointer p-1 border border-gray-100 rounded-md shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            disabled={!canNext}
            onClick={() => onPageChange(page + 1)}
            className="cursor-pointer p-1 border border-gray-100 rounded-md shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
