import Loading from "@/components/common/Loading";
import PrimaryButton from "@/components/common/PrimaryButton";
import TwitterIcon from "@/components/icons/TwitterIcon";
import { WEBSITE_URL } from "@/data/constant";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import { formatIpfsData } from "@/utils/data";
import { fetchImageUrl } from "@/utils/ipfs";
import { formatDateFromString } from "@/utils/utils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Emoji from "react-emoji-render";
import { useAccount } from "wagmi";
import { DataProps } from "../mint/[tokenId]";

interface Props {
  tokenId: string;
  uriData: DataProps;
  data: any;
}

const CollectionItem: React.FC<Props> = ({ tokenId, uriData, data }) => {
  const router = useRouter();
  const { address } = useAccount();

  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

  if (router.isFallback) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Mint Toast | Collection</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CeloOrg" />
        <meta name="twitter:title" content={uriData?.name ?? ""} />
        <meta name="twitter:description" content={uriData?.description} />
        <meta
          name="twitter:image"
          content={fetchImageUrl(uriData?.imageHash ?? "") ?? "#"}
        />
      </Head>
      <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto">
        <Link href={`/collections/${userAddress}`} className="font-bold mx-3">
          👈 Back to Collection
        </Link>

        <div className="flex flex-col justify-center w-full mt-16 items-center">
          <span className="text-3xl font-bold text-center">
            {uriData?.name ?? ""}
          </span>
          <Image
            src={fetchImageUrl(uriData?.imageHash ?? "") ?? "#"}
            height="285"
            width="285"
            className="mt-8"
            alt={uriData?.name + " Event Toast"}
          />
          <div className="flex flex-row justify-between w-[285px] mt-3">
            <span className="font-semibold">
              {data?.currentSupply}/{uriData?.totalToastSupply ?? 0}
            </span>
            <span className="font-semibold">#</span>
          </div>
          <div className="md:w-[400px] w-full px-2 md:mx-0 mt-8 flex flex-col">
            <div className="text-gray-500 whitespace-pre-wrap">
              <Emoji>{uriData?.description ?? ""}</Emoji>
            </div>
            <Link
              className="justify-self-start mt-10 text-green"
              href={uriData?.websiteLink ?? "#"}
              target={"_blank"}
            >
              🌐 {uriData?.websiteLink ?? ""}
            </Link>
            <div className="mt-4">
              Start: 📆{" "}
              {formatDateFromString(uriData?.startDate ?? "01/01/2023")}
            </div>
            <div className="mt-1">
              End: 📆 {formatDateFromString(uriData?.endDate ?? "01/01/2023")}
            </div>
            <Link
              href={"/event/" + tokenId}
              className="w-full py-3 px-2 bg-white border-2 border-black mt-7"
            >
              🍻 View event page
            </Link>
            <Link
              href={uriData?.websiteLink ?? "#"}
              className="w-full py-3 px-2 bg-white border-2 border-black mt-7"
            >
              🫡 View holder page
            </Link>
            <div className="mt-12 w-full flex justify-center">
              <PrimaryButton
                onClick={() => {
                  window.open(
                    "https://twitter.com/intent/tweet?text=I%20just%20minted%20a%20Toast%20on%20MintToast!%20Check%20it%20out%20at%20" +
                      WEBSITE_URL +
                      "%2Fevent%2F" +
                      tokenId,
                    "_blank"
                  );
                }}
                text="Share on Twitter"
                icon={<TwitterIcon />}
              />
            </div>
          </div>
          <div className="flex w-full justify-start px-8"></div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }: { params: any }) {
  const res = await getMintCollectionData(params.tokenId as string);
  if (!res || !res.serie) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: {
      tokenId: params.tokenId,
      data: res.serie,
      uriData: formatIpfsData(res.uriData),
    },
  };
}

export default CollectionItem;
