import CollectionItem from "@/components/collection/CollectionItem";
import { getUserCollection } from "@/graphql/queries/getUserCollection";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { useAccount } from "wagmi";

export default function Collections() {
  const { address, status } = useAccount();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      var collection = await getUserCollection(address!);
      setData(collection);
      setLoading(false);
    };
    if (address) {
      setIsConnected(true);
      fetchCollections();
    }
    if (status == "disconnected") {
      setIsConnected(false);
    }
  }, [address]);

  if (!isConnected) {
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

  if (!data) {
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
      <Head>
        <title>🍞 Mint Toast | Collection</title>
      </Head>
      <div className="flex flex-col justify-center items-center md:pt-20 pt-4 max-w-xl mx-auto">
        <div className="flex flex-col justify-start w-full">
          {data.length > 0 ? (
            <span className="px-5 text-lg font-bold">2023</span>
          ) : (
            <div className="w-full flex-initial justify-center items-center text-center">
              <span className="px-5 text-lg font-bold">
                You don&apos;t have any toast
              </span>
            </div>
          )}
          <div className="flex flex-row flex-wrap justify-evenly">
            {data.map((item: any) => (
              <CollectionItem event={item.event} key={item.event.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
