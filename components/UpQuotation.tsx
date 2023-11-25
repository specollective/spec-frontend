import Image from "next/image";
interface UpQuotationProps {
  className: string;
}

export default function UpQuotation({ className }: UpQuotationProps) {
  return (
    <div className="float-right">
      <Image
        className="flex flex-col-reverse"
        src="/upQuotationMarks.svg"
        alt="Quotation Mark"
        width={40}
        height={40}
      />
    </div>
  )
}

