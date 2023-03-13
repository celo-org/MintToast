import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center md:pt-20 pt-4 max-w-xl mx-auto">
        <span className="px-5 text-3xl font-bold">Mint a new Toast!</span>
        <div className="flex flex-col justify-start w-full mt-20">
          <div className="flex flex-row flex-wrap justify-evenly">
            {/* Card 1 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-green">
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-lg text-center font-bold">
                    Secret Word
                  </span>
                </div>
              </span>
            </Link>
            {/* Card 2 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-yellow">
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-lg text-center font-bold">
                    6 digit code
                  </span>
                </div>
              </span>
            </Link>
            {/* Card 3 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-white">
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-lg text-center font-bold">QR Code</span>
                </div>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
