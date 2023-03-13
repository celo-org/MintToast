import PrimaryButton from "@/components/common/PrimaryButton";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center md:pt-20 pt-4">
        <div className="font-semibold md:text-4xl text-lg">
          gm! MintToast is a
        </div>
        <div className="font-semibold md:text-4xl text-lg">
          community of toastmasters
        </div>
        <div className="flex md:flex-row flex-col md:flex-nowrap flex-wrap mt-10">
          <div className="w-[285px] h-[285px] bg-green border-2 border-black flex flex-col justify-end items-center pb-3">
            <span className="font-semibold text-xl text-center">
              Earn badges when you attend events
            </span>
          </div>
          <div className="w-[285px] h-[285px] bg-yellow border-t-0 border-r-2 md:border-t-2 border-b-2 border-l-2 md:border-l-0 border-black flex flex-col justify-end items-center pb-3">
            <span className="font-semibold text-xl text-center">
              Celebrate your community
            </span>
          </div>
        </div>
        <div className="font-semibold md:text-xl text-lg mt-8 text-center">
          Mint, collect and create event badges
        </div>
        <div className="mt-7">
          <PrimaryButton
            text="Connect Wallet to get started"
            onClick={() => {}}
          />
        </div>
        <div className="mt-24 mx-4">
          <PrimaryButton
            text="gm? Toast? Toastmaster? Help me, I am toasted"
            varient="secondary"
            onClick={() => {}}
          />
        </div>
      </div>
    </>
  );
}
