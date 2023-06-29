import { SITE_URL } from "@/data/constant";
import { toast } from "react-toastify";
import PrimaryButton from "../common/PrimaryButton";

type Props = {
  id: string;
};

function Share({ id }: Props) {
  const url = SITE_URL + "/mint/" + id;
  return (
    <>
      <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto">
        <span className="mt-16 mb-2 font-bold">Share your toast</span>
        <div className="flex flex-row space-x-5 mt-4">
          <div className="flex justify-center items-center bg-white border border-black w-full p-4">
            {url}
          </div>
        </div>
        <div className="mt-8 w-full flex justify-center">
          <PrimaryButton
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              toast.success("Copied to clipboard");
            }}
            text="Copy"
          />
        </div>
      </div>
    </>
  );
}

export default Share;
