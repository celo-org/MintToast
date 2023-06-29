import MintLoading from "@/components/common/mint/MintLoading";
import MintSuccess from "@/components/common/mint/MintSuccess";
import MintView from "@/components/common/mint/MintView";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
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
    } else {
      setAddress("");
    }
  }, [isConnected, walletAddress]);

  const handleSubmit = useCallback(async () => {
    try {
      if (address) {
        toast.loading("Minting your toast, please wait...");
      }
      var resolvedAddress: string = "";
      if (address.length < 42 && !address.includes(".celo")) {
        toast.error("Please enter a valid address!");
        return;
      }

      if (address.includes(".celo")) {
        // const signer = await connector?.getWalletClient();
        // let resolver = new ResolveMasa({
        //   networkName: getNetworkNameByChainId(42220),
        //   signer,
        // });
        // const { resolutions, errors } = await resolver?.resolve(address);
        // if (errors.length) {
        //   console.log(errors);
        //   toast.error("Something went wrong!");
        // } else {
        //   if (resolutions.length) {
        //     resolvedAddress = resolutions[0].address;
        //   } else {
        //     toast.error("No .celo name found!");
        //   }
        // }
        resolvedAddress = address;
      } else {
        resolvedAddress = address;
      }

      if (!executeRecaptcha) {
        return;
      }
      executeRecaptcha("enquiryFormSubmit").then(async (token) => {
        console.log("token", token);
        console.log("resolvedAddress", resolvedAddress);
        setView(View.MINTLOADING);
        var res = await axios.post(getApiEndpoint().mintEndpoint, {
          tokenId,
          address: resolvedAddress,
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
      });
    } catch (e) {
      toast.dismiss();
      toast.error(e as string);
      setView(View.MINT);
    } finally {
      setView(View.SUCCESS);
    }
  }, [address, docId, executeRecaptcha, router, tokenId]);

  return (
    <>
      <Head>
        <title>Mint Toast | Mint</title>
      </Head>
      {view === View.MINT && (
        <MintView
          currentSupply={data?.currentSupply}
          account={address}
          handleSubmit={handleSubmit}
          setAddress={setAddress}
          uriData={uriData}
        />
      )}
      {view == View.MINTLOADING && <MintLoading />}
      {view == View.SUCCESS && <MintSuccess />}
    </>
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
