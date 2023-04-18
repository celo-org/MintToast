import Image from "next/image";

type Props = {};

function NoToast({}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center px-5 mt-10 text-lg font-bold">
      Find wild Toasts at community event
      <Image
        src="/images/no-toast.png"
        alt="Conenct Wallet"
        width={250}
        height={250}
      />
    </div>
  );
}

export default NoToast;
