type Props = {
  children: React.ReactNode;
};

function SectionCard({ children }: Props) {
  return (
    <div className="p-3 border border-gray-100 rounded-md flex flex-col gap-y-3">{children}</div>
  );
}

export default SectionCard;
