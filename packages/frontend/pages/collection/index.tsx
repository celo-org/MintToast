import { formatIpfsData } from "@/utils/data";
import { fetchImageUrl } from "@/utils/ipfs";
import { IPFSDataProps } from "@/utils/props";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { useAccount } from "wagmi";

export default function Collections() {
  const { address, isConnected, isDisconnected, isReconnecting } = useAccount();
  const [data, setData] = useState<IPFSDataProps | null>();
  const [loading, setLoading] = useState(false);
  const [disconnected, setDisconnected] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      const res = await axios.post("/api/get-user-events", {
        address,
      });
      console.log("res.data", res.data.data);
      if (res.data.data === null) {
        setData(null);
        setLoading(false);
        return;
      } else {
        const formattedData = formatIpfsData(res.data.data);
        setData(formattedData);
        setLoading(false);
      }
    };
    if (isConnected) {
      fetchCollections();
      setDisconnected(false);
    }
  }, [address, isConnected]);

  useEffect(() => {
    if (!isReconnecting && isDisconnected) {
      setDisconnected(true);
    }
  }, [isDisconnected, isReconnecting]);

  if (disconnected) {
    return (
      <>
        <div className="w-full text-center px-5 mt-10 text-lg font-bold">
          Please connect the wallet to see your collection
        </div>
      </>
    );
  }

  if (loading) {
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

  if (data === null) {
    return (
      <>
        <div className="w-full text-center px-5 mt-10 text-lg font-bold">
          You don&apos;t have any collection yet
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center md:pt-20 pt-4 max-w-xl mx-auto">
        <div className="flex flex-col justify-start w-full">
          <span className="px-5 text-lg font-bold">2023</span>
          <div className="flex flex-row flex-wrap justify-evenly">
            {/* Card 1 */}
            <Link
              href={"/collection/" + data?.tokenId ?? 0}
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={fetchImageUrl(data?.imageHash!)}
                  alt={data?.name + " Event Toast"}
                  className="w-full h-full cursor-pointer"
                  width={170}
                  height={170}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
