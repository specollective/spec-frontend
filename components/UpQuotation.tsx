import Image from "next/image";
interface UpQuotationProps {
  className: string;
}

export default function UpQuotation({ className }: UpQuotationProps) {
  return (
    <div className="w-32 float-right">
      <Image
        className="flex flex-col-reverse"
        src="/upQuotationMarks.svg"
        alt="Quotation Mark"
        width={65}
        height={65}
      />
    </div>
  )
}

