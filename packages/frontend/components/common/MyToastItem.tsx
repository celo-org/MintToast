import { formatIpfsData } from "@/utils/data";
import { fetchImageUrl } from "@/utils/ipfs";
import Image from "next/image";
import { useRouter } from "next/router";
import NotFound from "../../public/images/404.png";

type Props = {};

const MyToastItem = ({
  collection,
  fetchFirebaseData,
}: {
  collection: any;
  fetchFirebaseData: (tokenId: string) => Promise<void>;
}) => {
  const router = useRouter();
  const formattedData = formatIpfsData(collection.uriData);
  return (
    <div className="w-full h-[170px] pushable-card select-none rounded-sm bg-black border-none p-0 outline-offset-4 mt-5">
      <span className="w-full h-[170px] front-card rounded-sm border-2 border-black text-black font-bold text-base bg-white flex flex-row">
        {formattedData.imageHash ? (
          <Image
            src={fetchImageUrl(formattedData.imageHash)}
            alt={"Event Toast"}
            className="border-r-2 border-black h-full"
            width={170}
            height={170}
          />
        ) : (
          <Image
            src={NotFound}
            alt={"Event Toast"}
            className="border-r-2 border-black h-full"
            width={170}
            height={170}
          />
        )}
        <div className="flex flex-col p-5 w-full">
          <span className="text-sm font-bold">
            {formattedData.name || "Event Toast"}
          </span>
          <div className="flex flex-col mt-1">
            <span className="text-xs text-gray-400">
              From: {formattedData.formattedStartDate}
            </span>
            <span className="text-xs text-gray-400">
              To: {formattedData.formattedEndDate}
            </span>
          </div>
          <div className="flex flex-row-reverse mt-5">
            <div
              className="border-2 border-black px-2 py-1 rounded-xl ml-2 cursor-pointer"
              onClick={() => {
                fetchFirebaseData(collection.serie.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="md:w-6 md:h-6 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
            </div>
            <div
              className="border-2 border-black px-2 py-1 rounded-xl cursor-pointer"
              onClick={() => {
                router.push(`/event/${collection.serie.id}`);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="md:w-6 md:h-6 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default MyToastItem;
