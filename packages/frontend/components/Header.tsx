import Link from "next/link";
import { useRouter } from "next/router";
import { CustomConnectButton } from "./CustomConnectButton";

export default function Header() {
  const router = useRouter();
  const getActiveTab = () => {
    if (router.pathname.includes("collection")) return "collection";
    else if (router.pathname.includes("mint")) return "mint";
    else if (router.pathname.includes("create")) return "create";
    else return "index";
  };
  return (
    <>
      <div className="mx-auto md:max-w-7xl w-full md:px-2 px-5 sm:px-6 lg:px-8">
        <div className="hidden relative md:flex h-16 justify-between">
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="text-4xl text-center md:flex items-center"
            >
              🍞
            </Link>
            <div className="sm:ml-6">
              <Link
                href="/collections"
                className={`font-bold text-base text-gray-900 px-4 py-2 rounded-xl ${
                  getActiveTab() === "collection"
                    ? "bg-white border border-black"
                    : ""
                }`}
              >
                🫙 Collection
              </Link>
            </div>
            <div className="sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/mint"
                className={`font-bold text-base text-gray-900 px-4 py-1 rounded-xl ${
                  getActiveTab() === "mint"
                    ? "bg-white border border-black"
                    : ""
                }`}
              >
                🫡 Mint
              </Link>
            </div>
            <div className="sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/create"
                className={`font-bold text-base text-gray-900 px-4 py-1 rounded-xl ${
                  getActiveTab() === "create"
                    ? "bg-white border border-black"
                    : ""
                }`}
              >
                🍻 Create
              </Link>
            </div>
          </div>
          <div className="md:absolute md:inset-y-0 md:right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <CustomConnectButton />
          </div>
        </div>
        <div className="md:hidden flex h-16 flex-row justify-between items-center">
          <Link href="/" className="text-4xl text-center md:flex items-center">
            🍞
          </Link>
          <CustomConnectButton />
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-background border-t-2 border-black">
        <div className="h-full max-w-lg flex flex-row flex-nowrap justify-evenly items-center mx-auto">
          <div className="sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/collections"
              className={`font-bold text-base text-gray-900 px-2 py-1 rounded-xl ${
                getActiveTab() === "collection"
                  ? "bg-white border border-black"
                  : ""
              }`}
            >
              🫙 Collection
            </Link>
          </div>
          <div className="sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/mint"
              className={`font-bold text-base text-gray-900 px-2 py-1 rounded-xl ${
                getActiveTab() === "mint" ? "bg-white border border-black" : ""
              }`}
            >
              🫡 Mint
            </Link>
          </div>
          <div className="sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/create"
              className={`font-bold text-base text-gray-900 px-2 py-1 rounded-xl ${
                getActiveTab() === "create"
                  ? "bg-white border border-black"
                  : ""
              }`}
            >
              🍻 Create
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
