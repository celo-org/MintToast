import PrimaryButton from "@/components/common/PrimaryButton";
import TwitterIcon from "@/components/icons/TwitterIcon";
import QRCodeModal from "@/components/modals/QRCodeModal";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import { formatIpfsData } from "@/utils/data";
import { fetchImageUrl } from "@/utils/ipfs";
import { IPFSDataProps } from "@/utils/props";
import { formatTimestampToTimeElapsedForm } from "@/utils/utils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function EventPage() {
  const router = useRouter();
  const { tokenId } = router.query;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [uriData, setUriData] = useState<IPFSDataProps | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      setLoading(true);
      const res = await getMintCollectionData(tokenId as string);
      if (!res) {
        toast.error("Invalid Token ID");
        router.push("/");
      } else {
        const ipfsData = formatIpfsData(res.uriData);
        setData(res?.event);
        setUriData(ipfsData);
        setLoading(false);
      }
    };
    if (tokenId) {
      getEvent();
    }
  }, [router, tokenId]);

  console.log("data", data);

  return (
    <>
      <Head>
        <title>🍞 Mint Toast | Event</title>
      </Head>

      <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto">
        <Link href="/collection" className="font-bold mx-3">
          👈 Back
        </Link>
        {loading ? (
          <div className="h-full w-full flex justify-center items-center mt-20">
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
        ) : (
          <>
            <QRCodeModal
              isOpen={isQRCodeOpen}
              closeModal={() => {
                setIsQRCodeOpen(false);
              }}
              value={"/mint/" + data?.id ?? ""}
            />

            <div className="flex flex-col justify-center w-full mt-16 items-center">
              <span className="text-3xl font-bold text-center">
                {uriData?.name ?? ""}
              </span>
              <Image
                height={285}
                width={285}
                src={fetchImageUrl(uriData?.imageHash ?? "")}
                alt={uriData?.name + " Event Toast"}
                className="border-2 border-black mt-6"
              />
              <span className="font-semibold mt-8">
                {data?.currentSupply}/{uriData?.totalToastSupply ?? "100"}
              </span>

              <div className="md:w-[400px] w-full px-2 md:mx-0 mt-8 flex flex-col">
                <div className="text-gray-500">
                  {uriData?.description ?? ""}
                </div>
                <div className="mt-12 w-full flex justify-center">
                  <PrimaryButton
                    onClick={() => {
                      setIsQRCodeOpen(true);
                    }}
                    text="Show QR Code"
                  />
                </div>
                <div className="mt-5 w-full flex justify-center">
                  <PrimaryButton
                    onClick={() => {
                      router.push("/mint/" + data?.id);
                    }}
                    text="Mint the Toast"
                  />
                </div>
                <Link
                  className="justify-self-start mt-10 text-green"
                  href={uriData?.websiteLink ?? ""}
                  target={"_blank"}
                >
                  🌐 {uriData?.websiteLink ?? ""}
                </Link>
                <div className="text-black font-bold text-lg mt-8 ">
                  How to mint Toast?
                </div>
                <div className="text-gray-500">
                  Instructions coming soon. For now ask our Toast Masters.
                </div>
                <Link
                  href={
                    "https://celoscan.io/address/" + uriData?.createdBy ?? ""
                  }
                  target={"_blank"}
                  className="w-full py-3 px-2 bg-yellow border-2 border-black mt-7"
                >
                  <div className="flex flex-row justify-between">
                    <span>🍻 View Toaster</span>
                    <span>
                      {uriData?.createdBy?.substring(0, 5) +
                        "..." +
                        uriData?.createdBy?.substring(
                          (uriData?.createdBy.length ?? 18) - 5,
                          uriData?.createdBy.length ?? 18
                        )}
                    </span>
                  </div>
                </Link>
                {data != null && data?.items.length > 0 && (
                  <div className="w-full text-xs mt-8">
                    <table className="w-full table-fixed border border-black">
                      <thead className="">
                        <tr className="h-8 text-center bg-black text-white">
                          <th>Toast ID</th>
                          <th>Collector</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {data.items.map((item: any, index: any) => {
                          const address =
                            item.owner.id.substring(0, 4) +
                            "..." +
                            item.owner.id.substring(38, 42);
                          return (
                            <tr
                              key={index}
                              className="h-8 text-center border-b border-black"
                            >
                              <td>#{item.id}</td>
                              <td>
                                <a
                                  href={
                                    "https://celoscan.io/address/" +
                                    item.owner.id
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {address}
                                </a>
                              </td>
                              <td>
                                {formatTimestampToTimeElapsedForm(
                                  item.timestamp
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
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
          </>
        )}
      </div>
    </>
  );
}
