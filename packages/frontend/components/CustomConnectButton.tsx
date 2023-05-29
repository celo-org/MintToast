import { Menu, Transition } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { toast } from "react-toastify";
import IconButton from "./common/IconButton";
import PrimaryButton from "./common/PrimaryButton";
import CopyIcon from "./icons/CopyIcon";
import OpenUrlIcon from "./icons/OpenUrlIcon";
import PowerOffIcon from "./icons/PowerOffIcon";
import TwitterIcon from "./icons/TwitterIcon";

type Props = {};

export const CustomConnectButton = () => {
  const router = useRouter();
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
                      <Menu.Button className="font-bold border border-black px-4 py-1">
                        👾 {account.displayName}
                      </Menu.Button>
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
                      <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-[375px] w-[355px] border-2 border-black">
                        <div className="flex flex-row items-center justify-between p-4 border-b-2 border-black">
                          <div>👾 {account.displayName}</div>
                          <div className="flex flex-row space-x-2">
                            <IconButton
                              icon={<CopyIcon />}
                              onClick={async () => {
                                await navigator.clipboard.writeText(
                                  account.address
                                );
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
                            <IconButton
                              icon={<PowerOffIcon />}
                              onClick={openAccountModal}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-start px-4 py-3 border-b-2 border-black">
                          <div className="text-lg mb-1">Network</div>
                          <div className="flex flex-row space-x-3 justify-end items-center">
                            <Image
                              src="https://images.ctfassets.net/wr0no19kwov9/1kUyahp0Q6X7T9sVXZ16Ho/d553a9dd0e18fac0f14c8bf8b789a303/brand-kit-symbol-image-01.png?fm=webp&w=3840&q=70"
                              alt="Celo Logo"
                              width={25}
                              height={25}
                            />
                            <span className="text-3xl font-bold">Celo</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start px-4 py-3 border-b-2 border-black">
                          <div className="text-lg mb-1">Balance</div>
                          <div className="flex flex-row space-x-3 justify-end items-center">
                            <span className="text-3xl font-bold">5.4 CELO</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start px-4 py-3 border-b-2 border-black">
                          <div className="text-lg mb-1">MintToast Balance</div>
                          <div className="flex flex-row space-x-3 justify-end items-center">
                            <span className="text-3xl font-bold">
                              26 Toasts
                            </span>
                          </div>
                        </div>
                        {/* User Account Info */}
                        <div className="p-6 flex flex-col">
                          {/* Buttons */}
                          <div className="flex flex-col space-y-4">
                            <PrimaryButton
                              onClick={() => {}}
                              text="Link your Twitter handle"
                              varient="twitter"
                              icon={<TwitterIcon />}
                            />
                          </div>
                        </div>
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
