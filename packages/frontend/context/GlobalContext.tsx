// contexts/GlobalContext.tsx

import { getApiEndpoint } from "@/utils/data";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAccount } from "wagmi";

interface TwitterDataProp {
  username: string;
  address: string;
  profileImageUrlHttps: string;
  name: string;
}

interface GlobalContextProp {
  twitterData?: TwitterDataProp;
}

const GlobalContext = createContext<GlobalContextProp | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [twitter, setTwitter] = useState<TwitterDataProp>();
  const { address } = useAccount();

  useEffect(() => {
    const getTwitterData = async () => {
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
        }
      } catch (err: any) {
        setTwitter(undefined);
      }
    };
    if (address) {
      getTwitterData();
    }
  }, [address]);

  return (
    <GlobalContext.Provider
      value={{
        twitterData: twitter,
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
