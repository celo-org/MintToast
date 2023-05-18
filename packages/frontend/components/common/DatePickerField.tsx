import DatePicker from "react-datepicker";
type Props = {
  label: string;
  value: string;
  onChange: (field: string, value: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  fieldName: string;
};

function DatePickerField({
  label,
  value,
  onChange,
  placeholder,
  className,
  onBlur,
  fieldName,
}: Props) {
  return (
    <div className={className}>
      <label htmlFor="message" className="block mb-2 font-medium text-gray-500">
        {label}
      </label>
      <DatePicker
        selected={(value && new Date(value)) || null}
        className="block p-2.5 w-full text-sm text-black bg-white border border-black focus:ring-blue-500 focus:border-blue-500"
        placeholderText={placeholder}
        onChange={(val, e) => {
          onChange(fieldName, val);
        }}
      />
    </div>
  );
}

export default DatePickerField;
