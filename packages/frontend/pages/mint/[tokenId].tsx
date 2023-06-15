import InputField from "@/components/common/InputField";
import PrimaryButton from "@/components/common/PrimaryButton";
import { CAPTCH_SITEKEY } from "@/data/constant";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import { fetchImageUrl } from "@/utils/ipfs";
import { ResolveMasa } from "@/utils/masa";
import { getNetworkNameByChainId } from "@masa-finance/masa-sdk";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Emoji from "react-emoji-render";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import NewToastDropping from "../../public/images/NewToastDropping.png";
import SuccessfulMinting from "../../public/images/SuccessfulMinting.png";
import { formatIpfsData, getApiEndpoint } from "../../utils/data";
import { database } from "../../utils/firebase";

export interface DataProps {
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

interface Props {
  tokenId: string;
  uriData: DataProps;
  data: any;
  docId: string;
}

export enum View {
  MINT = "mint",
  MINTLOADING = "mint-loading",
  SUCCESS = "success",
}

const QRPage: React.FC<Props> = ({ tokenId, uriData, data, docId }) => {
  // get the id from the url
  const { executeRecaptcha } = useGoogleReCaptcha();

  const router = useRouter();
  const { address: walletAddress, isConnected } = useAccount();
  const [address, setAddress] = useState<string>("");
  const [view, setView] = useState<View>(View.MINT);
  const { connector } = useAccount();

  useEffect(() => {
    if (isConnected) {
      setAddress(walletAddress as string);
    }
  }, [isConnected, walletAddress]);

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
      console.log("resolvedAddress", resolvedAddress);
      executeRecaptcha("enquiryFormSubmit").then(async (token) => {
        try {
          setView(View.MINTLOADING);
          var res = await axios.post(getApiEndpoint().mintEndpoint, {
            tokenId,
            resolvedAddress,
            token,
            docId,
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
  }, [address, docId, executeRecaptcha, router, tokenId]);

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
      <Head>
        <title>Mint Toast | Mint</title>
      </Head>
      {view === View.MINT && (
        <div className="flex flex-col justify-center w-full mt-10 items-center">
          <div className="md:w-[400px] w-full px-2 md:mx-0 mt-0 flex flex-col">
            <InputField
              label="What is your Address?"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="0x0... or .celo name"
              fieldName="address"
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
          <span className="text-3xl font-bold mt-8 text-center">
            {uriData?.name ?? ""}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="border-2 border-black w-[285px] h-[285px] mt-5"
            src={fetchImageUrl(uriData?.imageHash ?? "")}
            alt={uriData?.name + " Image"}
          />

          <span className="font-semibold mt-8">
            {data?.currentSupply}/{uriData?.totalToastSupply ?? "0"}
          </span>

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
          </div>
        </div>
      )}
      {view == View.MINTLOADING && (
        <div className="flex flex-col justify-center w-full mt-10 items-center">
          <span className="text-2xl font-bold">
            Your new Toast is about to drop
          </span>
          <Image src={NewToastDropping} alt="Loading" />
        </div>
      )}
      {view == View.SUCCESS && (
        <div className="flex flex-col justify-center w-full mt-10 items-center">
          <span className="text-2xl font-bold mb-5">
            You have successfully minted a new Toast!
          </span>
          <Image src={SuccessfulMinting} alt="Success" />
          <span className="text-2xl font-bold mt-5">
            Go to your collection to see it
          </span>
        </div>
      )}
    </GoogleReCaptchaProvider>
  );
};

export async function getServerSideProps({ params }: { params: any }) {
  var docSnapshot = await getDoc(doc(database, "events", params.tokenId));
  var resultData = docSnapshot.data();

  if (!resultData)
    return {
      props: {
        tokenId: "",
        docId: params.tokenId,
        data: {},
      },
    };

  const eventId = resultData!.eventId;
  const res = await getMintCollectionData(eventId as string);
  return {
    props: {
      tokenId: eventId,
      docId: params.tokenId,
      data: res.serie,
      uriData: formatIpfsData(res.uriData),
    },
  };
}

export default QRPage;
