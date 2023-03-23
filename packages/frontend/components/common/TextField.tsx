type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
};

function TextArea({ label, value, onChange, placeholder, className }: Props) {
  return (
    <div className={className}>
      <label htmlFor="message" className="block mb-2 font-medium text-gray-500">
        {label}
      </label>
      <textarea
        id="message"
        rows={6}
        className="block p-2.5 w-full text-sm text-black bg-white border border-black focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder ?? ""}
        required
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default TextArea;
