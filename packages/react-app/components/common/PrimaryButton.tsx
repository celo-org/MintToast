type Props = {
  text: string;
  onClick: () => void;
  varient?: "primary" | "secondary";
  icon?: React.ReactNode;
};

const PrimaryButton: React.FC<Props> = ({
  text,
  onClick,
  varient = "primary",
  icon,
}) => {
  const getBgColor = () => {
    switch (varient) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "bg-white";
    }
  };

  return (
    <button
      onClick={onClick}
      className="pushable select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4"
    >
      <span
        className={`front rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 ${getBgColor()}`}
      >
        <div className="inline-flex items-center">
          {icon ?? icon}
          <span className={icon ? "ml-1" : "ml-0"}>{text}</span>
        </div>
      </span>
    </button>
  );
};

export default PrimaryButton;
