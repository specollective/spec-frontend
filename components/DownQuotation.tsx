import Image from "next/image";
import downQuotationMarks from "../public/downQuotationMark.svg";


export default function DownQuotation() {
  
    return (
          <Image
              className="ml-10 float-left"
            src={"/downQuotationMark.svg"}
            width={50}
            height={50}
              alt="Quotation Mark"
              priority
            />
  )
}

