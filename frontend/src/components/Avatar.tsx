type Props = {
  fio: string;
};

const COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-green-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function getInitials(fio: string): string {
  const parts = fio.trim().split(/\s+/);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return parts[0][0] + parts[1][0];
}

function getColorByName(fio: string): string {
  let hash = 0;
  for (let i = 0; i < fio.length; i++) {
    hash = fio.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function Avatar({ fio }: Props) {
  const color = getColorByName(fio);
  const initials = getInitials(fio);
  return (
    <span
      className={`${color} uppercase text-xs font-semibold text-white 
      w-7 h-7 rounded-full ring-2 ring-white inline-flex items-center justify-center
      hover:z-10 cursor-pointer hover:scale-110 relative transition-transform`}
      title={fio}
    >
      {initials}
    </span>
  );
}

export default Avatar;
