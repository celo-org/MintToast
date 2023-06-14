import Image from "next/image";
import ConnectWallet from "../../public/images/connect-wallet.png";
import PrimaryButton from "./PrimaryButton";

type Props = {};

function ConnectWalletMessage({}: Props) {
  return (
    <div className="flex flex-col justify-center items-center md:pt-0 pt-1 max-w-xl mx-auto">
      <Image
        src={ConnectWallet}
        className="w-[290px] h-[290px]"
        alt="Mint with 6 Digit code"
      />
      <span className="px-5 text-xl font-bold text-center my-12">
        Please connect your wallet to see your collection
      </span>
      <PrimaryButton
        onClick={() => {}}
        text="👾 Connect Wallet to get started"
      />
    </div>
  );
}

export default ConnectWalletMessage;
