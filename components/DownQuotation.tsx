import Image from "next/image";

export default function DownQuotation() {
  return (
    <div className="float-left w-32">
      <Image
        className="ml-10 float-left"
        src={"/downQuotationMark.svg"}
        width={40}
        height={40}
        alt="Quotation Mark"
        priority
      />
    </div>
  )
}

