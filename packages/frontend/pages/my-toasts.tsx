import ConnectWalletMessage from "@/components/common/ConnectWalletMessage";
import Loading from "@/components/common/Loading";
import MyToastItem from "@/components/common/MyToastItem";
import SecretShare from "@/components/create/SecretShare";
import Share from "@/components/create/Share";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

enum View {
  Loading = "loading",
  MyToasts = "my-toasts",
  NoCollection = "no-collection",
  ShareSecret = "share-secret",
  ShareURL = "share-url",
}

export default function MyToast() {
  const { address, status } = useAccount();
  const [isConnected, setIsConnected] = useState(false);
  const [collection, setCollection] = useState<any>(null);
  const [view, setView] = useState<View>(View.Loading);
  const [shareData, setShareData] = useState<any>(null);

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
      setView(View.Loading);
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
      if (res.data.resultData.length > 0) {
        var tempCollection: any = [];
        tempCollection = await Promise.all(
          res.data.resultData.map(async (item: any) => {
            const res = await getMintCollectionData(item.eventId);
            return res;
          })
        );
        setCollection(tempCollection);
        setView(View.MyToasts);
      } else {
        setView(View.NoCollection);
      }
    };
    if (isConnected && address) {
      fetchUserCollections();
    }
  }, [address, isConnected]);

  const fetchFirebaseData = async (tokenId: string) => {
    try {
      setView(View.Loading);
      const res = await axios({
        method: "post",
        url: "/api/get-owner",
        data: {
          tokenId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(
        "res.data.resultData",
        res.data.resultData[0].isSecretProtected
      );
      setShareData(res.data.resultData[0]);
      if (res.data.resultData[0].isSecretProtected) {
        setView(View.ShareSecret);
      } else {
        setView(View.ShareURL);
      }
    } catch (e) {
      setView(View.MyToasts);
    }
  };

  if (!isConnected) {
    return <ConnectWalletMessage />;
  }

  return (
    <>
      <Head>
        <title>Mint Toast</title>
      </Head>
      {view == View.Loading && <Loading />}
      {view == View.NoCollection && (
        <div className="w-full text-center px-5 mt-10 text-lg font-bold">
          You don&apos;t have any collection yet
        </div>
      )}
      {view == View.MyToasts && (
        <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto mt-12">
          <Link href="/create" className="font-bold mx-3 ">
            👈 Back
          </Link>
          <div className="flex flex-col justify-start items-start max-w-xl mx-auto mt-12 w-full px-2 md:px-20">
            {collection.map((item: any, index: number) => {
              return (
                <MyToastItem
                  key={index}
                  collection={item}
                  fetchFirebaseData={fetchFirebaseData}
                />
              );
            })}
          </div>
        </div>
      )}
      {view == View.ShareSecret && (
        <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto mt-12">
          <div
            onClick={() => {
              setView(View.MyToasts);
            }}
            className="font-bold mx-3 cursor-pointer"
          >
            👈 Back
          </div>
          <SecretShare otp={shareData.secret} />
        </div>
      )}
      {view == View.ShareURL && (
        <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto mt-12">
          <div
            onClick={() => {
              setView(View.MyToasts);
            }}
            className="font-bold mx-3 cursor-pointer"
          >
            👈 Back
          </div>
          <Share id={shareData.uuid} />
        </div>
      )}
    </>
  );
}
