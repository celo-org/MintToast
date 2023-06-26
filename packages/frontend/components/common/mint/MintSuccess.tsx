import Image from "next/image";
import SuccessfulMinting from "../../../public/images/SuccessfulMinting.png";

type Props = {};

function MintSuccess({}: Props) {
  return (
    <div className="flex flex-col justify-center w-full mt-10 items-center">
      <span className="text-2xl font-bold mb-5">
        You have successfully minted a new Toast!
      </span>
      <Image src={SuccessfulMinting} alt="Success" />
      <span className="text-2xl font-bold mt-5">
        Go to your collection to see it
      </span>
    </div>
  );
}

export default MintSuccess;
