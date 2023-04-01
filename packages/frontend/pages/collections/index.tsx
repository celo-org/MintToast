import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
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
        <div className="w-full text-center px-5 mt-10 text-lg font-bold">
          Please connect the wallet to see your collection
        </div>
      </>
    );
  }

  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="#FF84E2"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}
