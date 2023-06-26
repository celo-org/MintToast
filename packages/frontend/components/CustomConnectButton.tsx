import { useGlobalContext } from "@/context/GlobalContext";
import useMobileDetect from "@/hooks/useMobileDetect";
import { getApiEndpoint } from "@/utils/data";
import { auth } from "@/utils/firebase";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowDownIcon,
  ClipboardDocumentIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import IconButton from "./common/IconButton";
import PrimaryButton from "./common/PrimaryButton";
import CopyIcon from "./icons/CopyIcon";
import OpenUrlIcon from "./icons/OpenUrlIcon";
import PowerOffIcon from "./icons/PowerOffIcon";
import TwitterIcon from "./icons/TwitterIcon";

type TwitterIntegrationDataProp = {
  secret: string;
  token: string;
  username: string;
  displayName: string;
  photoURL: string;
};

enum View {
  ACCOUNT = "ACCOUNT",
  LINKWALLET = "LINKWALLET",
  LOADING = "LOADING",
  MINTTOAST = "MINTTOAST",
  ALREADYLINKED = "ALREADYLINKED",
}

export const CustomConnectButton = () => {
  const [view, setView] = useState<View>(View.ACCOUNT);
  const [twitterAuthLoading, setTwitterAuthLoading] = useState(false);
  const isMobile = useMobileDetect();
  const [twitterIntegrationData, setTwitterIntegrationData] = useState<
    TwitterIntegrationDataProp | undefined
  >();
  const { twitterData } = useGlobalContext();
  const { address } = useAccount();

  const handleTwitterAuth = async () => {
    setTwitterAuthLoading(true);
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = TwitterAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        const secret = credential.secret;
        const user = result.user;
        setTwitterIntegrationData({
          secret: secret ?? "",
          token: token ?? "",
          displayName: user?.displayName ?? "",
          photoURL: user?.photoURL ?? "",
          username: (user as any)?.reloadUserInfo.screenName,
        });
        setView(View.LINKWALLET);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setTwitterAuthLoading(false);
    }
  };

  const handleTwitterLink = async () => {
    console.log("address", address);
    if (!twitterIntegrationData) {
      toast.error("Twitter data not found");
      return;
    }
    setTwitterAuthLoading(true);
    try {
      setView(View.LOADING);
      const response = await axios({
        method: "post",
        url: getApiEndpoint().registerTwitterEndpoint,
        data: {
          accessToken: twitterIntegrationData?.token,
          secret: twitterIntegrationData?.secret,
          address: address,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        setView(View.MINTTOAST);
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
      setView(View.LINKWALLET);
    } finally {
      setTwitterAuthLoading(false);
    }
  };

  const getAccountControls = (
    account: any,
    openAccountModal: () => void,
    twitterUsername: string
  ) => {
    return (
      <div className="flex flex-row justify-between items-center border-b-2 border-black py-0 md:py-3 pr-3">
        <div className="flex flex-col items-start px-4 py-3 ">
          <div className="text-sm mb-1 block md:hidden">Accounts</div>
          <div className="flex flex-col justify-end items-start text-xl md:text-base font-bold md:font-normal">
            <div>👾 {account.displayName}</div>
            {twitterUsername && <div className="">@{twitterUsername}</div>}
          </div>
        </div>
        <div className="md:flex flex-row space-x-2 hidden h-14">
          <IconButton
            icon={<CopyIcon />}
            onClick={async () => {
              await navigator.clipboard.writeText(account.address);
              toast.success("Copied to clipboard");
            }}
          />
          <IconButton
            icon={<OpenUrlIcon />}
            onClick={() => {
              window.open(
                `https://explorer.celo.org/address/${account.address}/transactions`,
                "_blank"
              );
            }}
          />
          <IconButton icon={<PowerOffIcon />} onClick={openAccountModal} />
        </div>
      </div>
    );
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <PrimaryButton
                    onClick={openConnectModal}
                    text="Connect Wallet"
                  />
                );
              }

              if (chain.unsupported) {
                return (
                  <PrimaryButton
                    onClick={openChainModal}
                    text="Wrong network"
                  />
                );
              }

              return (
                <div className="w-56 text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      {isMobile ? (
                        <Menu.Button className="pushable select-none bg-black rounded-full border-none p-0 cursor-pointer outline-offset-4">
                          <div
                            className={`front rounded-full border-2 border-black text-black font-bold text-base flex justify-center items-center px-3 py-2 bg-primary`}
                          >
                            👾
                          </div>
                        </Menu.Button>
                      ) : (
                        <Menu.Button className="font-bold border-black border-2 px-4 py-1">
                          👾 {account.displayName}
                        </Menu.Button>
                      )}
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        style={{ zIndex: 9999 }}
                        className="absolute -right-5 md:right-0 mt-2 origin-top-right bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-screen md:w-[400px] border-2 border-black"
                      >
                        {view == View.ACCOUNT && (
                          <div className="flex flex-col">
                            {getAccountControls(
                              account,
                              openAccountModal,
                              twitterData?.username ?? ""
                            )}

                            <div className="flex flex-col items-start px-4 py-3 border-b-2 border-black">
                              <div className="text-sm mb-1">Network</div>
                              <div className="flex flex-row space-x-3 justify-end items-center">
                                <Image
                                  src="https://images.ctfassets.net/wr0no19kwov9/1kUyahp0Q6X7T9sVXZ16Ho/d553a9dd0e18fac0f14c8bf8b789a303/brand-kit-symbol-image-01.png?fm=webp&w=3840&q=70"
                                  alt="Celo Logo"
                                  width={25}
                                  height={25}
                                />
                                <span className="text-xl font-bold">Celo</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-start px-4 py-3 border-b-2 border-black">
                              <div className="text-sm mb-1">Balance</div>
                              <div className="flex flex-row space-x-3 justify-end items-center">
                                <span className="text-xl font-bold">
                                  5.4 CELO
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-start px-4 py-3 border-b-2 border-black">
                              <div className="text-sm mb-1">
                                MintToast Balance
                              </div>
                              <div className="flex flex-row space-x-3 justify-end items-center">
                                <span className="text-xl font-bold">
                                  26 Toasts
                                </span>
                              </div>
                            </div>
                            <div className="px-6 py-5 flex flex-col">
                              <div className="flex flex-col space-y-4 md:space-y-3">
                                {isMobile && (
                                  <PrimaryButton
                                    onClick={async () => {
                                      await navigator.clipboard.writeText(
                                        account.address
                                      );
                                      toast.success("Copied to clipboard");
                                    }}
                                    text="Copy address"
                                    varient="secondary"
                                    icon={
                                      <ClipboardDocumentIcon className="text-black h-5 w-5" />
                                    }
                                  />
                                )}
                                {isMobile && (
                                  <PrimaryButton
                                    onClick={() => {
                                      window.open(
                                        `https://explorer.celo.org/address/${account.address}/transactions`,
                                        "_blank"
                                      );
                                    }}
                                    text="View on Explorer"
                                    varient="secondary"
                                    icon={
                                      <LinkIcon className="text-black h-5 w-5" />
                                    }
                                  />
                                )}
                                {twitterData?.username ? (
                                  <PrimaryButton
                                    onClick={() => {
                                      if (!twitterAuthLoading) {
                                        handleTwitterAuth();
                                      }
                                    }}
                                    text={`Manage @${twitterData.username}`}
                                    varient="twitter"
                                    isLoading={twitterAuthLoading}
                                    icon={<TwitterIcon />}
                                  />
                                ) : (
                                  <PrimaryButton
                                    onClick={() => {
                                      if (!twitterAuthLoading) {
                                        handleTwitterAuth();
                                      }
                                    }}
                                    text="Link your Twitter handle"
                                    varient="twitter"
                                    isLoading={twitterAuthLoading}
                                    icon={<TwitterIcon />}
                                  />
                                )}
                                <div className="text-xs mt-4 text-gray-400 hidden md:block">
                                  You will be directed to Twitter and asked to
                                  authorize MintToast to have access to your
                                  handle and Tweets.
                                </div>
                              </div>
                            </div>
                            <div className="px-6 pt-5 pb-4 border-t-2 border-black flex flex-col md:hidden">
                              <div className="flex flex-col space-y-4">
                                <PrimaryButton
                                  onClick={openAccountModal}
                                  text="Disconnect"
                                  varient="primary"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {view == View.LINKWALLET && (
                          <div className="flex flex-col">
                            {getAccountControls(
                              account,
                              openAccountModal,
                              twitterData?.username ?? ""
                            )}
                            <div
                              className="p-4 font-bold cursor-pointer"
                              onClick={() => {
                                setView(View.ACCOUNT);
                              }}
                            >
                              👈 Go Back
                            </div>
                            <div className="flex flex-col py-5 px-4">
                              <div className="flex flex-row justify-between">
                                <div className="flex flex-row font-bold">
                                  <div className="w-10 flex items-center justify-center">
                                    <TwitterIcon color="blue" />
                                  </div>
                                  <span>Handle</span>
                                </div>
                                <span className="text-right">
                                  @{twitterIntegrationData?.username ?? ""}
                                </span>
                              </div>
                              <div className="flex flex-row justify-center w-full">
                                <ArrowDownIcon className="w-6 h-6" />
                              </div>
                              <div className="flex flex-row justify-between">
                                <div className="flex flex-row font-bold">
                                  <div className="w-10 flex items-center justify-center">
                                    👛
                                  </div>
                                  <span>Wallet</span>
                                </div>
                                <span>{account.displayName}</span>
                              </div>
                            </div>
                            <div className="flex flex-col px-4 my-6">
                              <PrimaryButton
                                text="👍 Link Wallet"
                                onClick={() => {
                                  handleTwitterLink();
                                }}
                              />
                            </div>
                          </div>
                        )}
                        {view == View.LOADING && (
                          <div className="flex flex-col h-96">
                            {getAccountControls(
                              account,
                              openAccountModal,
                              twitterData?.username ?? ""
                            )}
                            <div className="h-full w-full flex items-center font-bold px-10">
                              <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-4"></div>
                              </div>
                              Almost done...
                            </div>
                          </div>
                        )}
                        {view == View.MINTTOAST && (
                          <div className="flex flex-col h-96">
                            {getAccountControls(
                              account,
                              openAccountModal,
                              twitterData?.username ?? ""
                            )}
                            <div className="h-full w-full flex flex-col justify-between items-center px-6 py-6">
                              <div className="h-full flex flex-col items-start justify-center">
                                <span className="text-2xl">🎁</span>
                                <span className="font-bold">
                                  A Toast for you
                                </span>
                                <span className="">
                                  Your Twitter handle has been successfuly
                                  mapped to your wallet
                                </span>
                              </div>

                              <PrimaryButton
                                text="🤍 Mint a well deserved Toast"
                                onClick={() => {}}
                                fullWidth
                              />
                              <div className="mt-3 w-full">
                                <PrimaryButton
                                  fullWidth
                                  text="Done"
                                  onClick={() => {
                                    handleTwitterLink();
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {view == View.ALREADYLINKED && (
                          <div className="flex flex-col h-96">
                            {getAccountControls(
                              account,
                              openAccountModal,
                              twitterData?.username ?? ""
                            )}
                            <div className="h-full w-full flex flex-col justify-between items-center px-6 py-6">
                              <div className="h-full flex flex-col items-start justify-center">
                                <span className="text-2xl text-red-500">
                                  ‼️
                                </span>
                                <span className="font-bold">
                                  Already Linked!
                                </span>
                                <span className="">
                                  If you continue, the current address will also
                                  be linked to your Twitter handle
                                </span>
                              </div>

                              <PrimaryButton
                                text="🔁 Override"
                                onClick={() => {}}
                                fullWidth
                              />
                            </div>
                          </div>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectButton;
