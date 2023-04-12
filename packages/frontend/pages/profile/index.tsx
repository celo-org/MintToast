import CollectionItem from "@/components/collection/CollectionItem";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface Props {}

const Profile: React.FC<Props> = () => {
  const { address, status } = useAccount();
  const [isConnected, setIsConnected] = useState(false);
  const [collection, setCollection] = useState<any>(null);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    }
    if (status == "disconnected") {
      setIsConnected(false);
    }
  }, [address, status]);

  useEffect(() => {
    const fetchUserCollections = async () => {
      // axios call with content type application/json
      const res = await axios({
        method: "post",
        url: "/api/get-user-collection",
        data: {
          address,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.resultData) {
        var tempCollection: any = [];
        tempCollection = await Promise.all(
          res.data.resultData.map(async (item: any) => {
            const res = await getMintCollectionData(item.eventId);
            return res;
          })
        );
        setCollection(tempCollection);
      }
    };
    if (isConnected && address) {
      fetchUserCollections();
    }
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <>
        <div className="w-full text-center px-5 mt-10 text-lg font-bold">
          Please connect the wallet to see your collection
        </div>
      </>
    );
  }

  if (!collection) {
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
        <title>Mint Toast | Collection</title>
      </Head>
      <div className="flex flex-col justify-center items-center md:pt-20 pt-4 max-w-xl mx-auto">
        <div className="flex flex-col justify-start w-full">
          {collection.length > 0 ? (
            <span className="px-5 text-lg font-bold">2023</span>
          ) : (
            <div className="w-full flex-initial justify-center items-center text-center">
              <span className="px-5 text-lg font-bold">
                You don&apos;t have any toast
              </span>
            </div>
          )}
          <div className="flex flex-row flex-wrap justify-evenly">
            {collection.map((item: any) => {
              if (item != null) {
                return (
                  <CollectionItem key={item.event.id} event={item.event} />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
