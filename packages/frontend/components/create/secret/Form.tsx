import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import PrimaryButton from "@/components/common/PrimaryButton";
import TextArea from "@/components/common/TextField";
import { View } from "@/utils/utils";
import { SetStateAction } from "react";

type Props = {
  setView: (value: SetStateAction<View>) => void;
  formik: any;
};

function CreateForm({ setView, formik }: Props) {
  return (
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
            Toasts are better served fresh. On one will be able to mint this
            Toast after the expiry date.
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
  );
}

export default CreateForm;
