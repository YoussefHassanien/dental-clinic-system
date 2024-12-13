interface ReusableCardProps {
  backgroundColor: string;
  children: React.ReactNode;
}

const ReusableCard: React.FC<ReusableCardProps> = ({
  backgroundColor,
  children,
}) => {
  return (
    // Cards Container
    <div
      className={`relative flex flex-col justify-center items-start rounded-md p-4 space-y-8 hover:-translate-y-4 hover:shadow-xl ease-in-out duration-500 transition-all`}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
};

export default ReusableCard;
