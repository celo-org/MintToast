import InputField from "@/components/common/InputField";
import PrimaryButton from "@/components/common/PrimaryButton";
import TextArea from "@/components/common/TextField";
import Link from "next/link";
import { useState } from "react";

// create enum
enum View {
  IMAGE = "image",
  ATTRIBUTES = "attributes",
}

export default function New() {
  const [view, setView] = useState<View>(View.IMAGE);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [url, setUrl] = useState("");
  const [toastCount, setToastCount] = useState(0);
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto px-4 md:px-0">
        {view == View.IMAGE ? (
          <>
            <Link href="/create" className="font-bold mx-3">
              👈 Back
            </Link>
            <div className="flex flex-col justify-center w-full mt-10 items-center">
              <div className="md:w-[400px] w-full px-2 md:mx-0 mt-0 flex flex-col">
                <span className="font-semibold text-gray-500">
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
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
                <p className="mt-8 text-gray-500">Here are Toasts cropped:</p>
                <div className="w-full flex justify-center mt-8">
                  <div className="justify-self-center w-[285px] h-[285px] bg-white border-2 border-black flex flex-col justify-end items-center pb-3"></div>
                </div>
                <div className="w-full flex justify-center mt-8">
                  <PrimaryButton
                    text="👉 Save and Next"
                    onClick={() => {
                      setView(View.ATTRIBUTES);
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full justify-start px-8"></div>
            </div>
          </>
        ) : (
          <>
            <p
              onClick={() => {
                setView(View.IMAGE);
              }}
              className="font-bold mx-3 hover:cursor-pointer"
            >
              👈 Back
            </p>
            <div className="flex flex-col justify-center w-full mt-10 items-center">
              <div className="md:w-[400px] w-full px-2 md:mx-0 mt-0 flex flex-col">
                <InputField
                  label="What are you celebrating?"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Title of the Toast"
                />
                <TextArea
                  label="Raise your toast"
                  placeholder="Speech, Speech, Speech"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="mt-7"
                />

                <div className="flex flex-row w-full space-x-10 mt-8">
                  <div className="w-1/2">
                    <InputField
                      label="Start Date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                      placeholder="00/00/00"
                    />
                  </div>
                  <div className="w-1/2">
                    <InputField
                      label="End Date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                      placeholder="00/00/00"
                    />
                  </div>
                </div>
                <div className="text-gray-500 mt-2">
                  Toasts are better served fresh. On one will be able to mint
                  this Toast after the expiry date.
                </div>

                <InputField
                  label="Point your community to a link or website?"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  placeholder="url"
                  className="mt-7"
                />

                <InputField
                  label="How many Toasts do you need?"
                  value={toastCount.toString()}
                  onChange={(e) => {
                    setToastCount(parseInt(e.target.value));
                  }}
                  placeholder="Title of the Toast"
                  className="mt-7"
                />

                <InputField
                  label="What is your email?"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Title of the Toast"
                  className="mt-7"
                />
                {/* Image button */}

                <div className="w-full flex justify-center mt-8">
                  <PrimaryButton
                    text="👉 Save and Next"
                    onClick={() => {
                      setView(View.ATTRIBUTES);
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full justify-start px-8"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}