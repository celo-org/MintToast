import Image from "next/image";
import NewToastDropping from "../../../public/images/NewToastDropping.png";

type Props = {};

function MintLoading({}: Props) {
  return (
    <div className="flex flex-col justify-center w-full mt-10 items-center">
      <span className="text-2xl font-bold">
        Your new Toast is about to drop
      </span>
      <Image src={NewToastDropping} alt="Loading" />
    </div>
  );
}

export default MintLoading;
