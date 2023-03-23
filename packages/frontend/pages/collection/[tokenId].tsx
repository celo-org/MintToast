import PrimaryButton from "@/components/common/PrimaryButton";
import TwitterIcon from "@/components/icons/TwitterIcon";
import { formatIpfsData } from "@/utils/data";
import { fetchImageUrl } from "@/utils/ipfs";
import { IPFSDataProps } from "@/utils/props";
import { formatDateFromString } from "@/utils/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";

export default function CollectionItem() {
  const router = useRouter();
  const { tokenId } = router.query;

  const [data, setData] = useState<IPFSDataProps | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEventData = async () => {
      setLoading(true);
      const res = await axios.post("/api/get-event", {
        tokenId,
      });
      const formattedData = formatIpfsData(res.data.data);
      setData(formattedData);
      setLoading(false);
    };
    getEventData();
  }, []);

  return (
    <>
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
            <span className="text-3xl font-bold">{data?.name ?? ""}</span>
            <Image
              src={fetchImageUrl(data?.imageHash ?? "") ?? "#"}
              height="285"
              width="285"
              className="mt-8"
              alt={data?.name + " Event Toast"}
            />
            <div className="flex flex-row justify-between w-[285px] mt-3">
              <span className="font-semibold">
                10/{data?.totalToastSupply ?? 0}
              </span>
              <span className="font-semibold">#</span>
            </div>
            <div className="md:w-[400px] w-full px-2 md:mx-0 mt-8 flex flex-col">
              <div className="text-gray-500">{data?.description ?? ""}</div>
              <Link
                className="justify-self-start mt-10 text-green"
                href={data?.websiteLink ?? "#"}
                target={"_blank"}
              >
                🌐 {data?.websiteLink ?? ""}
              </Link>
              <div className="mt-4">
                Start: 📆{" "}
                {formatDateFromString(data?.startDate ?? "01/01/2023")}
              </div>
              <div className="mt-1">
                End: 📆 {formatDateFromString(data?.endDate ?? "01/01/2023")}
              </div>
              <Link
                href={"/event/" + tokenId}
                className="w-full py-3 px-2 bg-white border-2 border-black mt-7"
              >
                🍻 View event page
              </Link>
              <Link
                href={data?.websiteLink ?? "#"}
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
