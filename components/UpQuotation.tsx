import Image from "next/image";

export default function UpQuotation({ className }) {
  return (// Image of quotation marks
    <Image
      className={`flex flex-col-reverse mb-4`}
      src={"/upQuotationMarks.svg"}
      alt="Quotation Mark"
      width={50}
      height={50}
    />
  )
}

