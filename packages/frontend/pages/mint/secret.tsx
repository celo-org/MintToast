import InputField from "@/components/common/InputField";
import PrimaryButton from "@/components/common/PrimaryButton";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import { formatIpfsData } from "@/utils/data";
import { fetchImageUrl } from "@/utils/ipfs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

type Props = {};

export enum View {
  SECRET = "secret",
  MINT = "mint",
}

const Secret: React.FC<Props> = ({}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [view, setView] = useState<View>(View.SECRET);
  const [data, setData] = useState<any>({});
  const { address: walletAddress, isConnected } = useAccount();
  const [address, setAddress] = useState<string>();
  const [mintLoading, setMintLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected) {
      setAddress(walletAddress as string);
    }
  }, [isConnected, walletAddress]);

  const fetchDataFromFirebase = async () => {
    if (otp.length != 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    const res = await axios({
      method: "post",
      url: "/api/get-secret-data",
      data: {
        secret: otp,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.resultData == null) {
      toast.error("Invalid OTP");
      return;
    } else {
      const eventId = res.data.resultData.eventId;
      const dataRes = await getMintCollectionData(eventId as string);
      setData({
        tokenId: eventId,
        docId: res.data.resultData.uuid,
        data: dataRes.serie,
        uriData: formatIpfsData(dataRes.uriData),
      });
      setView(View.MINT);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    executeRecaptcha("enquiryFormSubmit").then(async (token) => {
      toast.loading("Minting your toast, please wait...");
      try {
        setMintLoading(true);
        const tokenId = data.tokenId;
        var res = await axios.post("/api/mint", {
          tokenId,
          address,
          token,
          docId: data.docId,
          secret: otp,
        });
        if (res.data["success"]) {
          setAddress("");
          toast.dismiss();
          toast.success(
            "💪🏼 Successfully minted Toast, redirecting to collection..."
          );
          setTimeout(() => {
            router.push("/collections");
          }, 5000);
        } else if (res.data["error"]) {
          toast.dismiss();
          toast.error(res.data["error"]);
        }
      } catch (e) {
        toast.dismiss();
        toast.error(e as string);
      } finally {
        setMintLoading(false);
      }
    });
  }, [address, data.docId, data.tokenId, executeRecaptcha, otp, router]);

  return (
    <div className="mt-10">
      {view == View.SECRET && (
        <>
          <Link href="/mint" className="font-bold mx-3">
            👈 Back
          </Link>
          <div className="flex flex-col justify-center w-full mt-10 items-center">
            <div className="md:w-[400px] w-full px-2 md:mx-0 mt-10 flex flex-col">
              <span className="font-semibold ">
                Enter a six character password:
              </span>
              <div className="flex items-center justify-center w-full mt-5 mb-10">
                <OTPInput
                  value={otp}
                  onChange={(val) => {
                    setOtp(val);
                  }}
                  numInputs={6}
                  containerStyle="flex flex-row space-x-5"
                  inputStyle="bg-white border border-black text-black text-base focus:ring-blue-500 focus:border-blue-500 block !w-[30px] p-2.5"
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <PrimaryButton onClick={fetchDataFromFirebase} text="Continue" />
            </div>
          </div>
        </>
      )}
      {view == View.MINT && (
        <>
          <div className="flex flex-col justify-center w-full mt-10 items-center">
            <div className="md:w-[400px] w-full px-2 md:mx-0 mt-0 flex flex-col">
              <InputField
                label="What is your Address?"
                value={address as string}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="0x0..."
                fieldName="address"
              />

              <div className="w-full flex justify-center mt-8">
                <PrimaryButton
                  text="👉 Mint Toast"
                  isLoading={mintLoading}
                  onClick={() => {
                    if (!address) {
                      toast.error("Please enter an Address");
                      return;
                    } else handleSubmit();
                  }}
                />
              </div>
            </div>
            <span className="text-3xl font-bold mt-8 text-center">
              {data.uriData?.name ?? ""}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="border-2 border-black w-[285px] h-[285px] mt-5"
              src={fetchImageUrl(data.uriData?.imageHash ?? "")}
              alt={data.uriData?.name + " Image"}
            />

            <span className="font-semibold mt-8">
              {data?.data.currentSupply}/{data.data?.totalSupply ?? "0"}
            </span>

            <div className="md:w-[400px] w-full px-2 md:mx-0 mt-8 flex flex-col">
              <div className="text-gray-500 whitespace-pre-wrap">
                {data.uriData?.description ?? ""}
              </div>
              <Link
                className="justify-self-start mt-10 text-green"
                href={data.uriData?.websiteLink ?? "#"}
                target={"_blank"}
              >
                🌐 {data.uriData?.websiteLink ?? ""}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Secret;
