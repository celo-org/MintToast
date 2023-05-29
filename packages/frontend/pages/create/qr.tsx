import CreateForm from "@/components/create/qr/Form";
import ImageView from "@/components/create/qr/ImageView";
import { WHITELISTED_ADDRESS } from "@/data/constant";
import { View } from "@/utils/utils";
import axios from "axios";
import { useFormik } from "formik";
import Head from "next/head";
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

  const getView = () => {
    if (view == View.IMAGE) {
      return (
        <ImageView
          handleImageUpload={handleImageUpload}
          imageSrc={imageSrc}
          setView={setView}
        />
      );
    } else if (view == View.ATTRIBUTES) {
      <CreateForm setView={setView} formik={formik} />;
    }
  };

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
        {getView()}
      </form>
      {/* </div> */}
    </>
  );
}
