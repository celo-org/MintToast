import PrimaryButton from "@/components/common/PrimaryButton";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if (address) {
      setWalletConnected(true);
    }
  }, [address]);

  return (
    <>
      <Head>
        <title>Mint Toast</title>
      </Head>
      <div className="h-full">
        <div className="flex flex-col justify-center items-center md:pt-16 pt-4 h-full">
          <div className="font-semibold md:text-4xl text-lg">
            gm! MintToast is a
          </div>
          <div className="font-semibold md:text-4xl text-lg">
            community of toastmasters
          </div>
          <div className="flex md:flex-row flex-col md:flex-nowrap flex-wrap mt-10">
            <div className="w-[285px] h-[285px] border-2 border-black flex flex-col justify-end items-center">
              <Image
                alt="Mint Toast"
                src="/images/Home_2.png"
                width={285}
                height={285}
              />
            </div>
            <div className="w-[285px] h-[285px] border-2 border-black flex flex-col justify-end items-center">
              <Image
                alt="Mint Toast"
                src="/images/Home_1.png"
                width={285}
                height={285}
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:flex-nowrap flex-wrap mt-4">
            <div className="w-[285px] text-center flex flex-col justify-end items-center font-semibold">
              Earn and mint digital collectibles
            </div>
            <div className="w-[285px] text-center flex flex-col justify-end items-center font-semibold">
              Celebrate your community with TOASTS
            </div>
          </div>
          <div className="mt-8">
            <PrimaryButton
              text={"👾 Connect Wallet to get started"}
              onClick={() => {
                if (!walletConnected) {
                  openConnectModal!();
                } else {
                  toast.info(
                    "There is nothing to do here, you are already connected 😄"
                  );
                }
              }}
            />
          </div>
          <div className="mt-10 mx-4">
            <PrimaryButton
              text="🤔 gm? Toast? Toastmaster? Help me, I am toasted"
              varient="secondary"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
