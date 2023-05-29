import PrimaryButton from "@/components/common/PrimaryButton";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import MintANewToast from "../../public/images/MintANewToast.png";
import ConnectWallet from "../../public/images/connect-wallet.png";

export default function Mint() {
  const { address } = useAccount();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    }
  }, [address]);

  if (!isConnected) {
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

  return (
    <>
      <Head>
        <title>Mint Toast | Mint</title>
      </Head>
      <div className="flex flex-col justify-center items-center md:pt-10 pt-1 max-w-xl mx-auto">
        <span className="px-5 text-2xl font-bold text-center mb-4">
          Have you encountered a wild Toast?
        </span>
        <Image src={MintANewToast} alt="Mint with 6 Digit code" />
        <div className="flex flex-col justify-start w-full my-10">
          <div className="flex flex-row flex-wrap justify-evenly">
            <Link
              href="/mint/secret"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="flex justify-center items-center px-4 text-lg w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-center bg-white">
                🤫 <br />
                Type a 6 character secret
              </span>
            </Link>
            <Link
              href="/mint/qr"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="flex justify-center items-center px-4 text-lg w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-center bg-white">
                📷 <br /> Scan a QR code
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
