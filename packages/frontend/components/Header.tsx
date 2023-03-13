import { CustomConnectButton } from "./CustomConnectButton";

export default function Header() {
  return (
    <>
      <div className="mx-auto md:max-w-7xl w-full md:px-2 px-5 sm:px-6 lg:px-8">
        <div className="hidden relative md:flex h-16 justify-between">
          <div className=" md:flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="text-4xl text-center md:flex items-center">🍞</div>
            <div className="sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#"
                className="inline-flex items-center font-bold text-base text-gray-900"
              >
                🫙 Collection
              </a>
            </div>
            <div className="sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#"
                className="inline-flex items-center font-bold text-base text-gray-900"
              >
                🫡 Mint
              </a>
            </div>
            <div className="sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#"
                className="inline-flex items-center font-bold text-base text-gray-900"
              >
                🍻 Create
              </a>
            </div>
          </div>
          <div className="md:absolute md:inset-y-0 md:right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <PrimaryButton onClick={() => {}} text="👾 Connect Wallet" /> */}
            <CustomConnectButton />
          </div>
        </div>
        <div className="md:hidden flex h-16 flex-row justify-between items-center">
          <div className="text-4xl text-center md:flex items-center">🍞</div>
          <CustomConnectButton />
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-background border-t-2 border-black">
        <div className="h-full max-w-lg flex flex-row flex-nowrap justify-evenly items-center mx-auto">
          <div className="sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="#"
              className="inline-flex items-center font-bold text-base text-gray-900"
            >
              🫙 Collection
            </a>
          </div>
          <div className="sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="#"
              className="inline-flex items-center font-bold text-base text-gray-900"
            >
              🫡 Mint
            </a>
          </div>
          <div className="sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="#"
              className="inline-flex items-center font-bold text-base text-gray-900"
            >
              🍻 Create
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
