import Image from "next/image";

export default function DownQuotation() {
  return (
    <div className="float-left w-32">
      <Image
        className="ml-10 float-left"
        src={"/downQuotationMark.svg"}
        width={65}
        height={65}
        alt="Quotation Mark"
        priority
      />
    </div>
  )
}

