import ConnectWalletMessage from "@/components/common/ConnectWalletMessage";
import Loading from "@/components/common/Loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Collections() {
  const { address, status } = useAccount();
  const router = useRouter();

  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      router.push(`/collections/${address}`);
    }
  }, [address, router]);

  if (!userAddress) {
    return (
      <>
        <ConnectWalletMessage />
      </>
    );
  }

  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <Loading />
      </div>
    </>
  );
}
