import InputField from "@/components/common/InputField";
import PrimaryButton from "@/components/common/PrimaryButton";
import { formatIpfsData } from "@/utils/data";
import { fetchImageUrl } from "@/utils/ipfs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

interface DataProps {
  name?: string;
  description?: string;
  totalToastSupply?: number;
  websiteLink?: string;
  communityName?: string;
  createdBy?: string;
  imageHash?: string;
  startDate?: string;
  endDate?: string;
  email?: string;
}

export default function QRPage() {
  // get the id from the url
  const router = useRouter();
  const { tokenId } = router.query;
  const { address: walletAddress, isConnected } = useAccount();
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataProps>({});

  useEffect(() => {
    const getEvent = async () => {
      setLoading(true);
      const res = await axios.post("/api/get-event", {
        tokenId,
      });
      const formattedData = formatIpfsData(res.data.data);
      setData(formattedData);
      setLoading(false);
    };
    getEvent();
  }, [tokenId]);

  useEffect(() => {
    if (isConnected) {
      setAddress(walletAddress as string);
    }
  }, [isConnected, walletAddress]);

  const handleSubmit = async () => {
    toast.loading("Minting your toast, please wait...");
    try {
      setMintLoading(true);
      var res = await axios.post("/api/mint", {
        tokenId,
        address,
      });
      if (res.data["success"]) {
        setAddress("");
        toast.dismiss();
        toast.success(
          "💪🏼 Successfully minted Toast, redirecting to collection..."
        );
        setTimeout(() => {
          router.push("/collection");
        }, 3000);
      }
    } catch (e) {
      toast.dismiss();
      toast.error(e as string);
    } finally {
      setMintLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full mt-10 items-center">
        <div className="md:w-[400px] w-full px-2 md:mx-0 mt-0 flex flex-col">
          <InputField
            label="What is your Address?"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="0x0..."
          />

          <div className="w-full flex justify-center mt-8">
            <PrimaryButton
              text="👉 Mint Toast"
              onClick={() => {
                if (!address) {
                  toast.error("Please enter an Address");
                  return;
                } else handleSubmit();
              }}
            />
          </div>
        </div>

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
          <>
            <span className="text-3xl font-bold mt-8">{data.name ?? ""}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="border-2 border-black w-[285px] h-[285px] mt-5"
              src={fetchImageUrl(data.imageHash ?? "")}
              alt={data.name + " Image"}
            />

            <span className="font-semibold mt-8">
              10/{data.totalToastSupply ?? "0"}
            </span>

            <div className="md:w-[400px] w-full px-2 md:mx-0 mt-8 flex flex-col">
              <div className="text-gray-500">{data.description ?? ""}</div>
              <Link
                className="justify-self-start mt-10 text-green"
                href={data.websiteLink ?? "#"}
                target={"_blank"}
              >
                🌐 {data.websiteLink ?? ""}
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}