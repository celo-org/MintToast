import { formatIpfsData } from "@/utils/data";
import { fetchDataFromIPFS, fetchImageUrl } from "@/utils/ipfs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  event: {
    id: string;
    creationTimestamp: any;
    totalSupply: any;
    currentSupply: any;
    toaster: any;
    uri: string;
    __typename: "Event";
  };
};

const CollectionItem: React.FC<Props> = ({ event }) => {
  const [data, setData] = useState<any>(null);
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      // remove ipfs:// or ipfs://ipfs:// from event.uri
      const res = await fetchDataFromIPFS(
        event.uri.replace("ipfs://", "").replace("ipfs://", "")
      );
      const formattedData = formatIpfsData(res);
      setData(formattedData);
    };
    fetchData();
  }, [event.uri]);

  return (
    <Link
      key={event.id}
      href={"/collection/" + event.id}
      className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
    >
      <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block">
        <Image
          src={fetchImageUrl(data?.imageHash!)}
          alt={data?.name + " Event Toast"}
          className="w-full h-full cursor-pointer"
          width={170}
          height={170}
        />
      </span>
    </Link>
  );
};

export default CollectionItem;
