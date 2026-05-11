import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination() {
  return (
    <div
      className="shrink-0 px-8 shadow-sm py-2 border border-t-gray-100 
    flex items-center justify-between text-sm text-gray-500"
    >
      <span>Показано 1-5 из 5</span>
      <div className="flex gap-2 items-center ">
        <span>На странице:</span>
        <button className="mr-5">12</button>
        <div className="gap-1 flex">
          <button className="cursor-pointer p-1 border border-gray-100 rounded-md shadow-sm">
            <ChevronLeft size={18} />
          </button>
          <button className="cursor-pointer p-1 border border-gray-100 rounded-md shadow-sm">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
