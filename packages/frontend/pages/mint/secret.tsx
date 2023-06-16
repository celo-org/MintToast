import PrimaryButton from "@/components/common/PrimaryButton";
import MintLoading from "@/components/common/mint/MintLoading";
import MintSuccess from "@/components/common/mint/MintSuccess";
import MintView from "@/components/common/mint/MintView";
import { CAPTCH_SITEKEY } from "@/data/constant";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import { formatIpfsData, getApiEndpoint } from "@/utils/data";
import { ResolveMasa } from "@/utils/masa";
import { getNetworkNameByChainId } from "@masa-finance/masa-sdk";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

type Props = {};

export enum View {
  SECRET = "secret",
  MINT = "mint",
  MINTLOADING = "mint-loading",
  SUCCESS = "success",
}

const Secret: React.FC<Props> = ({}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [view, setView] = useState<View>(View.SECRET);
  const [data, setData] = useState<any>({});
  const { address: walletAddress, isConnected, connector } = useAccount();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected) {
      setAddress(walletAddress as string);
    }
  }, [isConnected, walletAddress]);

  const fetchDataFromFirebase = async () => {
    try {
      setLoading(true);
      if (otp.length != 6) {
        toast.error("Please enter a valid OTP");
        return;
      }
      const res = await axios({
        method: "post",
        url: getApiEndpoint().getSecretDataEndpoint,
        data: {
          secret: otp,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.resultData == null) {
        toast.error("Invalid Password");
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
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (address) {
      toast.loading("Minting your toast, please wait...");
      var resolvedAddress: string = "";
      if (address.length < 42 && !address.includes(".celo")) {
        toast.error("Please enter a valid address!");
        return;
      }

      if (address.includes(".celo")) {
        const signer = await connector?.getSigner();
        let resolver = new ResolveMasa({
          networkName: getNetworkNameByChainId(42220),
          signer,
        });
        const { resolutions, errors } = await resolver?.resolve(address);
        if (errors.length) {
          console.log(errors);
          toast.error("Something went wrong!");
        } else {
          if (resolutions.length) {
            resolvedAddress = resolutions[0].address;
          } else {
            toast.error("No .celo name found!");
          }
        }
      } else {
        resolvedAddress = address;
      }

      if (!executeRecaptcha) {
        return;
      }

      executeRecaptcha("enquiryFormSubmit").then(async (token) => {
        toast.loading("Minting your toast, please wait...");
        try {
          setView(View.MINTLOADING);
          const tokenId = data.tokenId;
          var res = await axios.post(getApiEndpoint().mintEndpoint, {
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
          setView(View.MINT);
        } finally {
          setView(View.SUCCESS);
        }
      });
    }
  }, [address, data.docId, data.tokenId, executeRecaptcha, otp, router]);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={CAPTCH_SITEKEY as string}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
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
                <PrimaryButton
                  onClick={fetchDataFromFirebase}
                  text="Continue"
                  isLoading={loading}
                />
              </div>
            </div>
          </>
        )}
        {view == View.MINT && (
          <MintView
            currentSupply={data?.currentSupply}
            account={address ?? ""}
            handleSubmit={handleSubmit}
            setAddress={setAddress}
            uriData={data.uriData}
          />
        )}
        {view == View.MINTLOADING && <MintLoading />}
        {view == View.SUCCESS && <MintSuccess />}
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default Secret;
