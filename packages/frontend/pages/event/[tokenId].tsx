import Loading from "@/components/common/Loading";
import PrimaryButton from "@/components/common/PrimaryButton";
import QRCodeModal from "@/components/modals/QRCodeModal";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import { formatIpfsData } from "@/utils/data";
import { database } from "@/utils/firebase";
import { fetchImageUrl } from "@/utils/ipfs";
import { formatTimestampToTimeElapsedForm } from "@/utils/utils";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  ownerAddress: string;
  eventUUID: string;
}

const EventPage: React.FC<Props> = ({
  tokenId,
  uriData,
  data,
  ownerAddress,
  eventUUID,
}) => {
  const router = useRouter();
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
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
        <title>Mint Toast | Event</title>
      </Head>

      <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto">
        <div
          onClick={() => {
            router.back();
          }}
          className="font-bold mx-3 cursor-pointer"
        >
          👈 Back
        </div>

        <>
          <QRCodeModal
            isOpen={isQRCodeOpen}
            closeModal={() => {
              setIsQRCodeOpen(false);
            }}
            value={"/mint/" + eventUUID}
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
              <div className="text-gray-500 whitespace-pre-wrap">
                <Emoji>{uriData?.description ?? ""}</Emoji>
              </div>
              {ownerAddress == userAddress && (
                <>
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
                        router.push("/mint/" + eventUUID);
                      }}
                      text="Mint the Toast"
                    />
                  </div>
                </>
              )}

              <Link
                className="justify-self-start mt-10 text-green"
                href={uriData?.websiteLink ?? ""}
                target={"_blank"}
              >
                🌐 {uriData?.websiteLink ?? ""}
              </Link>
              {/* <div className="text-black font-bold text-lg mt-8 ">
                How to mint Toast?
              </div>
              <div className="text-gray-500">
                Instructions coming soon. For now ask our Toast Masters.
              </div> */}
              <Link
                href={"https://celoscan.io/address/" + uriData?.createdBy ?? ""}
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
                <>
                  <p className="mt-8 mb-2">Recent Mints...</p>
                  <div className="w-full text-xs ">
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
                              <td>#{item.idInSeries}</td>
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
                </>
              )}
            </div>
            <div className="flex w-full justify-start px-8"></div>
          </div>
        </>
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

  var result = await getDocs(
    query(
      collection(database, "events"),
      where("eventId", "==", parseInt(params.tokenId))
    )
  );

  var resultData = result.docs.map((doc) => doc.data());

  var ownerAddress = "";
  var eventUUID = "";
  if (resultData.length != 0) {
    ownerAddress = resultData[0].ownerAddress;
    eventUUID = resultData[0].uuid;
  }
  return {
    props: {
      tokenId: params.tokenId,
      data: res.serie,
      uriData: formatIpfsData(res.uriData),
      ownerAddress,
      eventUUID,
    },
  };
}

export default EventPage;
