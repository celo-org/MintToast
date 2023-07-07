// contexts/GlobalContext.tsx

import { getHistoricalTotalMints } from "@/graphql/queries/getHistoricalTotalMints";
import { getTotalMints } from "@/graphql/queries/getTotalMints";
import { getApiEndpoint, MASA_CDN_ADDRESS } from "@/utils/data";
import { MASA_CDN_ABI } from "@/utils/masa-cdn-abi";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { readContracts, useAccount } from "wagmi";

interface TwitterDataProp {
  username: string;
  address: string;
  profileImageUrlHttps: string;
  name: string;
}

interface GlobalContextProp {
  twitterData?: TwitterDataProp;
  isWhitelited?: boolean;
  checkingWhitelist?: boolean;
  totalMintsCount: number;
  totalHisttoricalMintsCount: number;
  resolveMasaFromName: (
    userAddedAddress: string
  ) => Promise<"" | `0x${string}` | undefined | string>;
  resolveMasaFromAddress: (userAddedAddress: string) => Promise<any>;
  getTwitterData: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextProp | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [twitter, setTwitter] = useState<TwitterDataProp>();
  const [isWhitelited, setIsWhitelisted] = useState<boolean>(false);
  const [checkingWhitelist, setCheckingWhitelist] = useState<boolean>(true);
  const [totalMintsCount, setTotalMintsCount] = useState<number>(0);
  const [totalHisttoricalMintsCount, setTotalHistoricalMintsCount] =
    useState<number>(0);
  const { address } = useAccount();

  const getTwitterData = useCallback(async () => {
    try {
      const res = await axios({
        method: "POST",
        url: getApiEndpoint().getTwitterFromAddressEndpoint,
        data: {
          address,
        },
      });
      if (res.data.success) {
        setTwitter({
          username: res.data.data.username,
          address: res.data.data.address,
          profileImageUrlHttps: res.data.data.profileImageUrlHttps,
          name: res.data.data.name,
        });
      } else {
        setTwitter(undefined);
      }
    } catch (err: any) {
      setTwitter(undefined);
    }
  }, [address]);

  useEffect(() => {
    const checkWhitelisted = async () => {
      try {
        setCheckingWhitelist(true);
        const res = await axios({
          method: "POST",
          url: getApiEndpoint().checkWhitelistEndpoint,
          data: {
            address,
          },
        });
        if (res.data.success) {
          setIsWhitelisted(true);
        } else {
          setIsWhitelisted(false);
        }
      } catch (err: any) {
        setIsWhitelisted(false);
      } finally {
        setCheckingWhitelist(false);
      }
    };

    const getTotalMintsCount = async () => {
      const mints = await getTotalMints(
        (address as string).toLocaleLowerCase()
      );
      if (mints) {
        setTotalMintsCount(mints);
      }
      const historicalMints = await getHistoricalTotalMints();
      if (historicalMints) {
        setTotalHistoricalMintsCount(historicalMints);
      }
    };

    if (address) {
      getTwitterData();
      checkWhitelisted();
      getTotalMintsCount();
    }
  }, [address, getTwitterData]);

  const resolveMasaFromName = async (userAddedAddress: string) => {
    const tokenId = await readContracts({
      contracts: [
        {
          address: MASA_CDN_ADDRESS,
          abi: MASA_CDN_ABI as any,
          functionName: "getTokenId",
          args: [userAddedAddress.replace(".celo", "")],
        },
      ],
    });
    if (tokenId) {
      const owner = await readContracts({
        contracts: [
          {
            address: MASA_CDN_ADDRESS,
            abi: MASA_CDN_ABI as any,
            functionName: "ownerOf",
            args: [tokenId[0].result as any],
          },
        ],
      });
      if (owner) {
        return owner[0].result as any;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  const resolveMasaFromAddress = async (userAddedAddress: string) => {
    const soulNames = await readContracts({
      contracts: [
        {
          address: MASA_CDN_ADDRESS,
          abi: MASA_CDN_ABI as any,
          functionName: "getSoulNames",
          args: [userAddedAddress],
        },
      ],
    });
    if (soulNames) {
      return soulNames[0].result as any;
    } else {
      return undefined;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        twitterData: twitter,
        isWhitelited: isWhitelited,
        checkingWhitelist,
        totalMintsCount,
        totalHisttoricalMintsCount,
        resolveMasaFromName,
        resolveMasaFromAddress,
        getTwitterData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
