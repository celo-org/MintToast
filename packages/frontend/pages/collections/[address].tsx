import CollectionItem from "@/components/collection/CollectionItem";
import ConnectWalletMessage from "@/components/common/ConnectWalletMessage";
import NoToast from "@/components/common/NoToast";
import { getUserCollection } from "@/graphql/queries/getUserCollection";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface Props {
  address: string;
  collection: any;
}

const Collections: React.FC<Props> = ({ address: userAddress, collection }) => {
  const { address, status } = useAccount();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    }
    if (status == "disconnected") {
      setIsConnected(false);
    }
  }, [address, status]);

  if (!isConnected) {
    return (
      <>
        <ConnectWalletMessage />
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
            <NoToast />
          )}
          <div className="flex flex-row flex-wrap justify-evenly">
            {collection.map((item: any) => {
              return <CollectionItem event={item.event} key={item.event.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }: { params: any }) {
  const res = await getUserCollection(params.address as string);
  if (!res) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: {
      address: params.address,
      collection: res,
    },
  };
}

export default Collections;
