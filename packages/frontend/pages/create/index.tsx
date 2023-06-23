import ConnectWalletMessage from "@/components/common/ConnectWalletMessage";
import PrimaryButton from "@/components/common/PrimaryButton";
import { WHITELISTED_ADDRESS } from "@/data/constant";
import useMobileDetect from "@/hooks/useMobileDetect";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import CreateToast from "../../public/images/CreateToast.png";
import NeedToasterRoleToCreate from "../../public/images/NeedToasterRoleToCreate.png";

export default function Home() {
  const [canCreate, setCanCreate] = useState(false);
  const { address } = useAccount();
  const router = useRouter();
  const isMobile = useMobileDetect();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (address) {
      if (WHITELISTED_ADDRESS.includes(address.toLowerCase())) {
        setCanCreate(true);
      }
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    }
  }, [address]);

  if (!isConnected) {
    return <ConnectWalletMessage />;
  }

  if (!canCreate) {
    return (
      <>
        <Head>
          <title>Mint Toast | Create Event</title>
        </Head>
        <div className="flex w-full flex-col justify-center items-center md:pt-20 pt-4">
          <span className="px-5 text-xl font-bold">
            You need to be allowlisted to create Toast Events
          </span>
          <Image
            alt="Need Toaster Role To Create"
            src={NeedToasterRoleToCreate}
          />
          <span className="px-5 text-xl font-bold mb-8">Join the waitlist</span>
          <PrimaryButton onClick={() => {}} text="⏳ Join the waitlist" />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Mint Toast | Create Event</title>
      </Head>
      <div className="flex flex-col justify-center items-center md:pt-0 pt-1 max-w-xl mx-auto">
        <Image alt="Need Toaster Role To Create" src={CreateToast} />
        <span className="px-5 text-lg md:text-3xl font-bold">
          Select a distribution method
        </span>
        <div className="flex flex-col items-center justify-start w-full mt-6">
          {isMobile ? (
            <>
              <div className="flex flex-col">
                <PrimaryButton
                  onClick={() => {
                    router.push("/create/secret");
                  }}
                  text="🤫 Secret"
                  varient="secondary"
                  fullWidth={true}
                />
                <div className="text-xs text-gray-400 mt-1">
                  420 mints max. Free
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <PrimaryButton
                  onClick={() => {
                    router.push("/create/qr");
                  }}
                  text="🔗 Link/QR"
                  varient="secondary"
                  fullWidth={true}
                />
                <div className="text-xs text-gray-400 mt-1">
                  420 mints max. Free
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row flex-wrap justify-evenly">
                {/* Card 1 */}
                <div className="flex flex-col justify-start w-[170px]">
                  <Link
                    href="/create/secret"
                    className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
                  >
                    <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold md:text-xl text-lg text-center bg-white flex justify-center items-center">
                      🤫 <br />
                      Secret
                    </span>
                  </Link>
                  <span className="text-sm text-gray-400 mt-4">
                    • Upto 420 mints per collection
                  </span>
                  <span className="text-sm text-gray-400">• Free</span>
                </div>
                <div className="flex flex-col justify-start w-[170px]">
                  <Link
                    href="/create/qr"
                    className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
                  >
                    <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold md:text-xl text-lg text-center bg-white flex justify-center items-center">
                      🔗 <br /> Link/QR
                    </span>
                  </Link>
                  <span className="text-sm text-gray-400 mt-4">
                    • Upto 420 mints per collection
                  </span>
                  <span className="text-sm text-gray-400">• Free</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="my-12">
          <PrimaryButton
            onClick={() => {
              router.push("/my-toasts");
            }}
            text="🍞 See your Toasts"
          />
        </div>
      </div>
    </>
  );
}
