import { fetchImageUrl } from "@/utils/ipfs";
import { IPFSDataProps } from "@/utils/props";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import InputField from "../InputField";
import PrimaryButton from "../PrimaryButton";

type Props = {
  account: string;
  setAddress: (address: string) => void;
  handleSubmit: () => void;
  uriData: IPFSDataProps;
  currentSupply: string;
};

function MintView({
  account,
  setAddress,
  handleSubmit,
  uriData,
  currentSupply,
}: Props) {
  const [connected, setConnected] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (isConnected) {
      setConnected(true);
    }
  }, [isConnected]);

  return (
    <div className="flex flex-col justify-center w-full mt-10 items-center">
      <div className="md:w-[400px] w-full px-2 md:mx-0 mt-0 flex flex-col">
        <div className="text-2xl font-bold justify-self-center flex w-full justify-center">
          A wild Toast appeared!
        </div>
      </div>
      <span className="text-xl font-bold mt-8 text-center">
        {uriData?.name ?? ""}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="border-2 border-black w-[200px] h-[200px] mt-5"
        src={fetchImageUrl(uriData?.imageHash ?? "")}
        alt={uriData?.name + " Image"}
      />

      <span className="font-semibold mt-2">
        {currentSupply}/{uriData?.totalToastSupply ?? "0"}
      </span>

      <div className="md:w-[400px] px-4 md:px-0 w-full flex flex-col mt-10">
        <InputField
          label="Paste your address"
          value={account}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="0x0..."
          fieldName="address"
        />

        <div className="w-full flex flex-col justify-center mt-8">
          <PrimaryButton
            text="🍞 Mint"
            fullWidth={true}
            onClick={() => {
              handleSubmit();
            }}
          />
          {!connected && (
            <div className="mt-7 mb-4 text-sm font-semibold">
              Or Connect your wallet
            </div>
          )}
          {!connected && (
            <PrimaryButton
              text="👾 Connect Wallet"
              fullWidth={true}
              varient="secondary"
              onClick={() => {
                if (openConnectModal) openConnectModal();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MintView;
