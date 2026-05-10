import { Link2, Copy } from "lucide-react";

type Props = {
  link: string;
};

function LinkBlock({ link }: Props) {
  const handlerCopy = async () => {
    await navigator.clipboard.writeText(link);
  };

  return (
    <div className="py-0.5 px-2 bg-gray-200 rounded-md flex items-center gap-2 group border border-gray-300">
      <Link2 className="text-gray-500" size={20} />
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline truncate text-xs"
      >
        {link}
      </a>

      <button
        onClick={handlerCopy}
        className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
      >
        <Copy size={14} className="text-gray-500" />
      </button>
    </div>
  );
}

export default LinkBlock;
