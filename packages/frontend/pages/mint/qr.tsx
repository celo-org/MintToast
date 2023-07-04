import Link from "next/link";
import { useRouter } from "next/router";
import { QrReader } from "react-qr-reader";

type Props = {};

const Qr: React.FC = ({}: Props) => {
  const { push } = useRouter();

  return (
    <>
      <div className="flex flex-col justify-start items-start md:pt-2 pt-0 max-w-xl mx-auto w-full px-4">
        <Link href={`/create`} className="font-bold mx-3">
          👈 Back
        </Link>
        <div className="font-bold mt-10">Scan the QR Code</div>
        <QrReader
          className="w-full"
          onResult={(result, error) => {
            if (result) {
              if (
                (result! as any).text.startsWith("https://") ||
                (result! as any).text.startsWith("http://")
              ) {
                push((result! as any).text);
              }
            }
          }}
          constraints={{
            facingMode: "user",
          }}
        />
      </div>
    </>
  );
};

export default Qr;
