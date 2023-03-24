import PrimaryButton from "@/components/common/PrimaryButton";
import TwitterIcon from "@/components/icons/TwitterIcon";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import { formatIpfsData } from "@/utils/data";
import { fetchImageUrl } from "@/utils/ipfs";
import { formatDateFromString } from "@/utils/utils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { toast } from "react-toastify";
import { DataProps } from "../mint/[tokenId]";

export default function CollectionItem() {
  const router = useRouter();
  const { tokenId } = router.query;
  console.log("router.query", router.query);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uriData, setUriData] = useState<DataProps>();

  useEffect(() => {
    const getEventData = async () => {
      setLoading(true);
      const res = await getMintCollectionData(tokenId as string);

      if (!res) {
        toast.error("Invalid Token ID");
        router.push("/");
      } else {
        const ipfsData = formatIpfsData(res.uriData);
        setUriData(ipfsData);
        setData(res.event);
        setLoading(false);
      }
    };
    if (tokenId != undefined) {
      getEventData();
    }
  }, [tokenId]);

  return (
    <>
      <Head>
        <title>🍞 Mint Toast | Collection</title>
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
        <Link href="/collection" className="font-bold mx-3">
          👈 Back to Collection
        </Link>
        {loading ? (
          <>
            <div className="h-full w-full mt-20 flex justify-center items-center">
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
        ) : (
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
              <div className="text-gray-500">{uriData?.description ?? ""}</div>
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
                  onClick={() => {}}
                  text="Share on Twitter"
                  icon={<TwitterIcon />}
                />
              </div>
            </div>
            <div className="flex w-full justify-start px-8"></div>
          </div>
        )}
      </div>
    </>
  );
}
