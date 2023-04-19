import Image from "next/image";

type Props = {};

function ConnectWalletMessage({}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center px-5 mt-10 text-lg font-bold">
      <Image
        src="/images/connect-wallet.png"
        alt="Conenct Wallet"
        width={250}
        height={250}
      />
      Please connect the wallet to see your collection
    </div>
  );
}

export default ConnectWalletMessage;
