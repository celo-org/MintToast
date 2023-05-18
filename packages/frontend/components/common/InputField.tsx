type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  fieldName: string;
};

function InputField({
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
      <label
        htmlFor="first_name"
        className="block mb-2 font-medium text-gray-500"
      >
        {label}
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-white border border-black text-black text-base focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder ?? ""}
        required
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        name={fieldName}
      />
    </div>
  );
}

export default InputField;
