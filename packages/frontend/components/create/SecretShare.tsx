import { toast } from "react-toastify";
import PrimaryButton from "../common/PrimaryButton";

type Props = {
  otp: string;
};

function SecretPreview({ otp }: Props) {
  return (
    <>
      <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto">
        <span className="mt-16 mb-2 font-bold">Share your toast</span>
        <div className="flex flex-row space-x-5 mt-4">
          {otp.split("").map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-center items-center bg-white border border-black w-[30px] h-[45px]"
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="mt-8 w-full flex justify-center">
          <PrimaryButton
            onClick={async () => {
              await navigator.clipboard.writeText(otp);
              toast.success("Copied to clipboard");
            }}
            text="Copy"
          />
        </div>
      </div>
    </>
  );
}

export default SecretPreview;
