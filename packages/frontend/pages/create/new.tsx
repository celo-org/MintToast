import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import PrimaryButton from "@/components/common/PrimaryButton";
import TextArea from "@/components/common/TextField";
import { WHITELISTED_ADDRESS } from "@/data/constant";
import axios from "axios";
import { useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import * as Yup from "yup";

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
  const [toastCount, setToastCount] = useState(10);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const [isConnected, setIsConnected] = useState(false);
  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
      if (WHITELISTED_ADDRESS.includes(address)) {
        setCanCreate(true);
      }
    }
  }, [address]);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearForm = () => {
    formik.resetForm();
    setImageSrc(null);
    setImage(null);
    setView(View.IMAGE);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      url: "",
      toastCount: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Title is required"),
      description: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Description is required"),
      startDate: Yup.date()
        .min(
          new Date(Date.now() - 86400000),
          "Start date cannot be before today"
        )
        .required("Start Date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date cannot be less than start date")
        .required("End Date is required"),
      url: Yup.string().url("Invalid URL").required("URL is required"),
      toastCount: Yup.number().required("Toast Count is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("values", values);
        setLoading(true);
        toast.loading("Creating your event, please wait...");
        var bodyFormData = new FormData();
        bodyFormData.append("title", values.title);
        bodyFormData.append("description", values.description);
        bodyFormData.append("startDate", values.startDate);
        bodyFormData.append("endDate", values.endDate);
        bodyFormData.append("websiteLink", values.url);
        bodyFormData.append("totalToastSupply", values.toastCount.toString());
        bodyFormData.append("image", image);
        bodyFormData.append("ownerAddress", address ?? "");
        var res = await axios({
          method: "post",
          url: "/api/create-toast",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.dismiss();
        toast.success(
          "💪🏼 We are working on creating your toast. Please check you profile section after 10-15 seconds."
        );
      } catch (e) {
        toast.dismiss();
        toast.error("🚨 Oops, toast burned, please try again...");
      } finally {
        setLoading(false);
        clearForm();
      }
    },
  });

  if (!isConnected) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-lg mt-10 font-bold">
          Please connect your wallet to continue
        </h1>
      </div>
    );
  }

  if (!canCreate) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-lg mt-10 font-bold">
          You are not allowed to create event yet, please stay tuned!
        </h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Mint Toast | Create New Event</title>
      </Head>
      {/* <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto px-4 md:px-0"> */}
      <form
        className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto px-4 md:px-0"
        onSubmit={formik.handleSubmit}
      >
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
                    <p className="mt-8 text-gray-500">
                      Here are Toasts cropped:
                    </p>
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
                        text="👉 Save and Next"
                        onClick={() => {
                          setView(View.ATTRIBUTES);
                        }}
                      />
                    </div>
                  </>
                )}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  placeholder="Title of the Toast"
                  fieldName="title"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="mt-1 text-red-500 text-sm">
                    *{formik.errors.title}
                  </div>
                ) : null}

                <TextArea
                  label="Raise your toast"
                  placeholder="Speech, Speech, Speech"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-7"
                  fieldName="description"
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="mt-1 text-red-500 text-sm">
                    *{formik.errors.description}
                  </div>
                ) : null}

                <div className="flex flex-row w-full space-x-10 mt-8">
                  <div className="w-1/2">
                    <DatePickerField
                      value={formik.values.startDate}
                      placeholder="MM/DD/YYYY"
                      onChange={formik.setFieldValue}
                      fieldName="startDate"
                      label="Start Date"
                    />
                  </div>
                  <div className="w-1/2">
                    <DatePickerField
                      value={formik.values.endDate}
                      placeholder="MM/DD/YYYY"
                      onChange={formik.setFieldValue}
                      fieldName="endDate"
                      label="End Date"
                    />
                  </div>
                </div>
                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="mt-1 text-red-500 text-sm">
                    *{formik.errors.startDate}
                  </div>
                ) : null}
                {formik.touched.endDate && formik.errors.endDate ? (
                  <div className="mt-1 text-red-500 text-sm">
                    *{formik.errors.endDate}
                  </div>
                ) : null}

                <div className="text-gray-500 mt-2">
                  Toasts are better served fresh. On one will be able to mint
                  this Toast after the expiry date.
                </div>

                <InputField
                  label="Point your community to a link or website?"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="url"
                  className="mt-7"
                  fieldName="url"
                />
                {formik.touched.url && formik.errors.url ? (
                  <div className="mt-1 text-red-500 text-sm">
                    *{formik.errors.url}
                  </div>
                ) : null}

                <InputField
                  label="How many Toasts do you need?"
                  value={formik.values.toastCount.toString()}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=""
                  className="mt-7"
                  fieldName="toastCount"
                />
                {formik.touched.toastCount && formik.errors.toastCount ? (
                  <div className="mt-1 text-red-500 text-sm">
                    *{formik.errors.toastCount}
                  </div>
                ) : null}
                {/* Image button */}

                <div className="w-full flex justify-center mt-8">
                  <PrimaryButton
                    sumbit={true}
                    text="👉 Save and Next"
                    onClick={() => {}}
                  />
                </div>
              </div>
              <div className="flex w-full justify-start px-8"></div>
            </div>
          </>
        )}
      </form>
      {/* </div> */}
    </>
  );
}
