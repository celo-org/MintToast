import PrimaryButton from "@/components/common/PrimaryButton";
import Link from "next/link";
import { SetStateAction } from "react";
import OTPInput from "react-otp-input";

type Props = {
  handleImageUpload: (e: any) => void;
  imageSrc: any;
  handleSecretCheck: () => void;
  otp: string;
  setOtp: (value: SetStateAction<string>) => void;
  secretCheckLoading: boolean;
};

function SecretImageView({
  handleImageUpload,
  imageSrc,
  handleSecretCheck,
  otp,
  setOtp,
  secretCheckLoading,
}: Props) {
  const autogenerateSixAlphaNumPassword = () => {
    const randomString = Math.random().toString(36).slice(-6);
    setOtp(randomString);
  };

  return (
    <>
      <Link href="/create" className="font-bold mx-3">
        👈 Back
      </Link>
      <div className="flex flex-col justify-center w-full mt-10 items-center">
        <div className="md:w-[400px] w-full px-2 md:mx-0 mt-0 flex flex-col">
          <span className="font-semibold text-gray-500">
            Enter a six character password
          </span>
          <div className="flex items-center justify-center w-full my-5">
            <OTPInput
              value={otp}
              onChange={(val) => {
                setOtp(val);
              }}
              numInputs={6}
              containerStyle="flex flex-row space-x-3"
              inputStyle="bg-white border border-black text-black text-base focus:ring-blue-500 focus:border-blue-500 block !w-[30px] py-2.5"
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <PrimaryButton
            onClick={autogenerateSixAlphaNumPassword}
            text="🧞‍♀️ Autogenerate"
          />
          {/* Secret Phase */}
          <span className="font-semibold text-gray-500 mt-14">
            Toast artwork
          </span>
          {/* Image button */}
          <div className="flex items-center justify-center w-full my-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-black cursor-pointer bg-background hover:bg-white"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                onChange={handleImageUpload}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          </div>

          <div className="text-gray-500">Image requirements:</div>
          <li className="text-gray-500 ml-5">
            <span className="">We only accept PNG and GIF formats</span>
          </li>
          <li className="text-gray-500 ml-5">
            <span>500 x 500 px max</span>
          </li>
          <li className="text-gray-500 ml-5">
            <span>Mas 1MB</span>
          </li>
          <li className="text-gray-500 ml-5">
            <span>Square shapes are recommended</span>
          </li>
          <li className="text-gray-500 ml-5">
            <span>This image cannot be edited after creation</span>
          </li>
          {imageSrc && (
            <>
              <p className="mt-8 text-gray-500">Here are Toasts cropped:</p>
              <div className="w-full flex justify-center mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="justify-self-center w-[285px] h-[285px] bg-white border-2 border-black flex flex-col justify-end items-center3"
                  src={imageSrc}
                  alt="uploaded"
                />
              </div>
              <div className="w-full flex justify-center mt-8">
                <PrimaryButton
                  text="👉 Next"
                  onClick={() => {
                    handleSecretCheck();
                  }}
                  isLoading={secretCheckLoading}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex w-full justify-start px-8"></div>
      </div>
    </>
  );
}

export default SecretImageView;
