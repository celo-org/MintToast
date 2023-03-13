import PrimaryButton from "@/components/common/PrimaryButton";
import TwitterIcon from "@/components/icons/TwitterIcon";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto">
        <Link href="/collection" className="font-bold mx-3">
          👈 Back to Collection
        </Link>
        <div className="flex flex-col justify-center w-full mt-16 items-center">
          <span className="text-3xl font-bold">Toast Title</span>
          <div className="w-[285px] h-[285px] bg-primary border-2 border-black pb-3 mt-6"></div>
          <div className="flex flex-row justify-between w-[285px] mt-3">
            <span className="font-semibold">10/240</span>
            <span className="font-semibold">#2458759</span>
          </div>
          <div className="md:w-[400px] w-full px-2 md:mx-0 mt-8 flex flex-col">
            <div className="text-gray-500">
              Donec pede justo, frin gilla vel, aliquet nec, vulputate eget,
              arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
              justo. Nullam dictum felis eu pede mollis pretium. Integer
              tincidunt.
            </div>
            <Link
              className="justify-self-start mt-10 text-green"
              href="https://gather.celo.org"
              target={"_blank"}
            >
              🌐 gather.celo.org
            </Link>
            <div className="mt-1">📆 Feb 02, 2023</div>
            <Link
              href="#"
              className="w-full py-3 px-2 bg-white border-2 border-black mt-7"
            >
              🍻 View event page
            </Link>
            <Link
              href="#"
              className="w-full py-3 px-2 bg-white border-2 border-black mt-7"
            >
              🫡 View holder page
            </Link>
            <div className="mt-12 w-full flex justify-center">
              <PrimaryButton
                onClick={() => {}}
                text="Share on Twitter"
                icon={<TwitterIcon />}
              />
            </div>
          </div>
          <div className="flex w-full justify-start px-8"></div>
        </div>
      </div>
    </>
  );
}
