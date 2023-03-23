import PrimaryButton from "@/components/common/PrimaryButton";
import TwitterIcon from "@/components/icons/TwitterIcon";
import QRCodeModal from "@/components/modals/QRCodeModal";
import { formatIpfsData } from "@/utils/data";
import { fetchImageUrl } from "@/utils/ipfs";
import { IPFSDataProps } from "@/utils/props";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";

export default function EventPage() {
  const router = useRouter();
  const { tokenId } = router.query;

  const [data, setData] = useState<IPFSDataProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

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
      <QRCodeModal
        isOpen={isQRCodeOpen}
        closeModal={() => {
          setIsQRCodeOpen(false);
        }}
        value={"/mint/" + data?.tokenId ?? ""}
      />
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
          <div className="flex flex-col justify-center w-full mt-16 items-center">
            <span className="text-3xl font-bold">{data?.name ?? ""}</span>
            <Image
              height={285}
              width={285}
              src={fetchImageUrl(data?.imageHash ?? "")}
              alt={data?.name + " Event Toast"}
              className="border-2 border-black mt-6"
            />
            <span className="font-semibold mt-8">
              10/{data?.totalToastSupply ?? "100"}
            </span>

            <div className="md:w-[400px] w-full px-2 md:mx-0 mt-8 flex flex-col">
              <div className="text-gray-500">{data?.description ?? ""}</div>
              <div className="mt-12 w-full flex justify-center">
                <PrimaryButton
                  onClick={() => {
                    setIsQRCodeOpen(true);
                  }}
                  text="Show QR Code"
                />
              </div>
              <Link
                className="justify-self-start mt-10 text-green"
                href={data?.websiteLink ?? ""}
                target={"_blank"}
              >
                🌐 {data?.websiteLink ?? ""}
              </Link>
              <div className="text-black font-bold text-lg mt-8 ">
                How to mint Toast?
              </div>
              <div className="text-gray-500">
                Instructions coming soon. For now ask our Toast Masters.
              </div>
              <Link
                href={"https://celoscan.io/address/" + data?.createdBy ?? ""}
                target={"_blank"}
                className="w-full py-3 px-2 bg-yellow border-2 border-black mt-7"
              >
                <div className="flex flex-row justify-between">
                  <span>🍻 View Toaster</span>
                  <span>
                    {data?.createdBy?.substring(0, 5) +
                      "..." +
                      data?.createdBy?.substring(
                        (data?.createdBy.length ?? 18) - 5,
                        data?.createdBy.length ?? 18
                      )}
                  </span>
                </div>
              </Link>
              {/* <div className="w-full text-xs mt-8">
              <table className="w-full table-fixed border border-black">
                <thead className="">
                  <tr className="h-8 text-center bg-black text-white">
                    <th>Toast ID</th>
                    <th>Collector</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="h-8 text-center border-b border-black">
                    <td>#123</td>
                    <td>0xd8...42Dcf</td>
                    <td>1 month ago</td>
                  </tr>
                  <tr className="h-8 text-center border-b border-black">
                    <td>#123</td>
                    <td>0xd8...42Dcf</td>
                    <td>1 month ago</td>
                  </tr>
                  <tr className="h-8 text-center border-b border-black">
                    <td>#123</td>
                    <td>0xd8...42Dcf</td>
                    <td>1 month ago</td>
                  </tr>
                  <tr className="h-8 text-center border-b border-black">
                    <td>#123</td>
                    <td>0xd8...42Dcf</td>
                    <td>1 month ago</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
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
