import Image from "next/image";
interface UpQuotationProps {
  className: string;
}

export default function UpQuotation({ className }: UpQuotationProps) {
  return (
    <Image
      className={`flex flex-col-reverse mb-4`}
      src={"/upQuotationMarks.svg"}
      alt="Quotation Mark"
      width={50}
      height={50}
    />
  )
}

