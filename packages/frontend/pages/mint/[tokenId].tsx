import InputField from "@/components/common/InputField";
import PrimaryButton from "@/components/common/PrimaryButton";
import { getMintCollectionData } from "@/graphql/queries/getMintCollectionData";
import { formatIpfsData } from "@/utils/data";
import { database } from "@/utils/firebase";
import { fetchImageUrl } from "@/utils/ipfs";
import axios from "axios";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

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
}

const QRPage: React.FC<Props> = ({ tokenId, uriData, data }) => {
  // get the id from the url
  const router = useRouter();
  const { address: walletAddress, isConnected } = useAccount();
  const [address, setAddress] = useState<string>("");
  const [mintLoading, setMintLoading] = useState<boolean>(false);

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
          router.push("/collections");
        }, 5000);
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
      <Head>
        <title>Mint Toast | Mint</title>
      </Head>
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
          <div className="text-gray-500">{uriData?.description ?? ""}</div>
          <Link
            className="justify-self-start mt-10 text-green"
            href={uriData?.websiteLink ?? "#"}
            target={"_blank"}
          >
            🌐 {uriData?.websiteLink ?? ""}
          </Link>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  var docIds: string[] = [];
  const querySnapshot = await getDocs(collection(database, "events"));
  querySnapshot.forEach((doc) => {
    docIds.push(doc.id);
  });

  const paths = docIds;
  return {
    paths: paths.map((id: string) => ({
      params: { tokenId: id },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  var docSnapshot = await getDoc(doc(database, "events", params.tokenId));
  var resultData = docSnapshot.data();

  const eventId = resultData!.eventId;
  const res = await getMintCollectionData(eventId as string);
  return {
    props: {
      tokenId: eventId,
      docId: params.tokenId,
      data: res.event,
      uriData: formatIpfsData(res.uriData),
    },
  };
}

export default QRPage;
