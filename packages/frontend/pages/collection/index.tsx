import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center md:pt-20 pt-4 max-w-xl mx-auto">
        <div className="flex flex-col justify-start w-full">
          <span className="px-5 text-lg font-bold">2023</span>
          <div className="flex flex-row flex-wrap justify-evenly">
            {/* Card 1 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-yellow">
                <div className="inline-flex items-center"></div>
              </span>
            </Link>
            {/* Card 2 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-primary">
                <div className="inline-flex items-center"></div>
              </span>
            </Link>
            {/* Card 3 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-white">
                <div className="inline-flex items-center"></div>
              </span>
            </Link>
            {/* Card 4 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-green">
                <div className="inline-flex items-center"></div>
              </span>
            </Link>
            {/* Card 5 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-yellow">
                <div className="inline-flex items-center"></div>
              </span>
            </Link>
            {/* Card 6 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-white">
                <div className="inline-flex items-center"></div>
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start w-full">
          <span className="px-5 mt-10 text-lg font-bold">2022</span>
          <div className="flex flex-row flex-wrap justify-evenly">
            {/* Card 1 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-primary">
                <div className="inline-flex items-center"></div>
              </span>
            </Link>
            {/* Card 2 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-white">
                <div className="inline-flex items-center"></div>
              </span>
            </Link>
            {/* Card 3 */}
            <Link
              href="/collection/0x0"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-green">
                <div className="inline-flex items-center"></div>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
