/* eslint-disable @next/next/no-img-element */
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import Loading from "@/components/common/Loading";
import PrimaryButton from "@/components/common/PrimaryButton";
import TextArea from "@/components/common/TextField";
import ImageView from "@/components/create/ImageView";
import Share from "@/components/create/Share";
import { useGlobalContext } from "@/context/GlobalContext";
import { getApiEndpoint } from "@/utils/data";
import { uploadImageToIpfs } from "@/utils/helper";
import { View, formatDateFromString } from "@/utils/utils";
import axios from "axios";
import { useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import * as Yup from "yup";

export default function New() {
  const [view, setView] = useState<View>(View.IMAGE);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const [isConnected, setIsConnected] = useState(false);
  const [canCreate, setCanCreate] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const { isWhitelited, checkingWhitelist } = useGlobalContext();

  const { connector } = useAccount();

  useEffect(() => {
    if (address && isWhitelited) {
      setIsConnected(true);
      setCanCreate(true);
    }
  }, [address, isWhitelited]);

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
        .max(35, "Must be 35 characters or less")
        .required("Title is required"),
      description: Yup.string()
        .max(500, "Must be 500 characters or less")
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
      toastCount: Yup.number()
        .required("Toast Count is required")
        .max(420, "Maximum toast count is 420"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        toast.loading("Creating your event, please wait...");
        const imageID = await uploadImageToIpfs(image);
        const reqObj = {
          title: values.title,
          description: values.description,
          startDate: formatDateFromString(values.startDate),
          endDate: formatDateFromString(values.endDate),
          websiteLink: values.url,
          totalToastSupply: values.toastCount.toString(),
          ownerAddress: address ?? "",
          imageID,
        };

        const signer = await connector?.getSigner();
        const signature = await signer?.signMessage(JSON.stringify(reqObj));

        var firebaseRes = await axios({
          method: "post",
          url: getApiEndpoint().createToastQREndpoint,
          data: { ...reqObj, signature },
          headers: { "Content-Type": "application/json" },
        });
        toast.dismiss();
        toast.success(
          "💪🏼 We are working on creating your toast. Please check you profile section after 10-15 seconds."
        );
        setLoading(false);
        clearForm();
        if (firebaseRes.data && firebaseRes.data.id) {
          setView(View.SUBMITTED);
          setId(firebaseRes.data.id);
        }
      } catch (e) {
        toast.dismiss();
        toast.error("🚨 Oops, toast burned, please try again...");
      } finally {
        setLoading(false);
      }
    },
  });

  if (checkingWhitelist) {
    return <Loading />;
  }

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
      <form
        className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto px-4 md:px-0"
        onSubmit={formik.handleSubmit}
      >
        {view == View.IMAGE && (
          <ImageView
            handleImageUpload={handleImageUpload}
            imageSrc={imageSrc}
            setView={setView}
          />
        )}
        {view == View.ATTRIBUTES && (
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
                      isEndDate={false}
                    />
                  </div>
                  <div className="w-1/2">
                    <DatePickerField
                      value={formik.values.endDate}
                      placeholder="MM/DD/YYYY"
                      onChange={formik.setFieldValue}
                      fieldName="endDate"
                      label="End Date"
                      isEndDate={true}
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
                    text="👉 Preview"
                    onClick={async () => {
                      const errors = await formik.validateForm();
                      formik.setTouched({
                        title: true,
                        description: true,
                        startDate: true,
                        endDate: true,
                        url: true,
                        toastCount: true,
                      });
                      if (Object.keys(errors).length == 0) {
                        setView(View.PREVIEW);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full justify-start px-8"></div>
            </div>
          </>
        )}
        {view == View.PREVIEW && (
          <>
            <div
              onClick={() => {
                setView(View.ATTRIBUTES);
              }}
              className="font-bold mx-3"
            >
              👈 Back
            </div>
            <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto">
              <span className="mt-16 mb-2">Preview your Toast</span>
              <div className="flex md:w-[400px] flex-col justify-center w-full items-center border-t-2 border-b-2 border-black py-9">
                <span className="text-3xl font-bold text-center">
                  {formik.values.title}
                </span>
                <img src={imageSrc} className="mt-8" alt={"Event Toast"} />
                <div className="flex flex-row justify-between w-[285px] mt-3">
                  <span className="font-semibold">
                    {0}/{formik.values.toastCount ?? 0}
                  </span>
                  <span className="font-semibold">#</span>
                </div>
                <div className="md:w-[400px] w-full px-2 md:mx-0 mt-8 flex flex-col">
                  <div className="text-gray-500 whitespace-pre-wrap">
                    {formik.values.description ?? ""}
                  </div>
                  <Link
                    className="justify-self-start mt-10 text-green"
                    href={formik.values.url ?? "#"}
                    target={"_blank"}
                  >
                    🌐 {formik.values.url ?? ""}
                  </Link>
                  <div className="mt-4">
                    Start: 📆{" "}
                    {formatDateFromString(
                      formik.values.startDate ?? "01/01/2023"
                    )}
                  </div>
                  <div className="mt-1">
                    End: 📆{" "}
                    {formatDateFromString(
                      formik.values.endDate ?? "01/01/2023"
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-12 w-full flex justify-center">
                <PrimaryButton
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  isLoading={loading}
                  text="🍻 Create"
                />
              </div>
            </div>
          </>
        )}
        {view == View.SUBMITTED && id != null && <Share id={id} />}
      </form>
    </>
  );
}
