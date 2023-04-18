import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mint Toast | Create Event</title>
      </Head>
      <div className="flex flex-col justify-center items-center md:pt-20 pt-4 max-w-xl mx-auto">
        <span className="px-5 text-3xl font-bold">Create a new Toast</span>
        <div className="flex flex-col justify-start w-full mt-20">
          <div className="flex flex-row flex-wrap justify-evenly">
            {/* Card 1 */}
            <Link
              href="/create/new"
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block">
                <Image
                  src="/images/CreateAToast.png"
                  alt="Plus"
                  width={170}
                  height={170}
                />
              </span>
            </Link>
            {/* Card 2 */}
            {/* <div
              onClick={() => {
                toast.error("Coming Soon!");
              }}
              className="w-[170px] h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 cursor-pointer outline-offset-4 mt-5"
            >
              <span className="w-[170px] h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base block py-2 px-6 bg-yellow">
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-lg text-center font-bold">
                    One of our templates
                  </span>
                </div>
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
