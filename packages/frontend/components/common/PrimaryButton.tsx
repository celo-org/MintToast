import useMobileDetect from "@/hooks/useMobileDetect";
import { toast } from "react-toastify";

type Props = {
  text: string;
  onClick: () => void;
  varient?: "primary" | "secondary" | "twitter";
  icon?: React.ReactNode;
  isLoading?: boolean;
  sumbit?: boolean;
  form?: string;
  fullWidth?: boolean;
};

const PrimaryButton: React.FC<Props> = ({
  text,
  onClick,
  varient = "primary",
  icon,
  isLoading = false,
  sumbit,
  form,
  fullWidth,
}) => {
  const getBgColor = () => {
    switch (varient) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "bg-white";
      case "twitter":
        return "bg-twitter";
    }
  };

  const isMobile = useMobileDetect();

  return (
    <button
      form={form}
      type={sumbit ? "submit" : "button"}
      onClick={() => {
        if (!isLoading) {
          onClick();
        } else {
          toast.dismiss();
          toast.error("It's loading, please wait...");
        }
      }}
      className={`pushable select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 ${
        fullWidth ? (isMobile ? "w-full" : "w-full") : "w-auto"
      }`}
    >
      <div
        className={`front rounded-sm border-2 border-black text-black font-bold text-base flex justify-center items-center py-3 px-8 ${getBgColor()}`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="inline-flex items-center">
            {icon ?? icon}
            <span className={icon ? "ml-1" : "ml-0"}>{text}</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default PrimaryButton;
