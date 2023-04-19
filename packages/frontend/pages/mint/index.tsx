import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Mint() {
  return (
    <>
      <Head>
        <title>Mint Toast | Mint</title>
      </Head>
      <div className="flex flex-col justify-center items-center md:pt-20 pt-4 max-w-xl mx-auto">
        <span className="px-5 text-3xl font-bold">Mint a new Toast!</span>
        <div className="flex flex-col justify-start w-full mt-20">
          <div className="flex flex-row flex-wrap justify-evenly">
            {/* Card 1 */}
            <div
              onClick={() => {
                toast.error("Coming Soon!");
              }}
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block">
                <Image
                  src="/images/MintWith6DigitCode.jpg"
                  alt="Mint with 6 Digit code"
                  width={170}
                  height={170}
                />
              </span>
            </div>
            {/* Card 2 */}
            <div
              onClick={() => {
                toast.error("Coming Soon!");
              }}
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block">
                <Image
                  src="/images/MintWithPassword.jpg"
                  alt="Mint with Password"
                  width={170}
                  height={170}
                />
              </span>
            </div>
            {/* Card 3 */}
            <div
              onClick={() => {
                toast.error("Coming Soon!");
              }}
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block">
                <Image
                  src="/images/MintWithQR.jpg"
                  alt="Mint with QR Code"
                  width={170}
                  height={170}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
