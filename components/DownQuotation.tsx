import Image from "next/image";
import downQuotationMarks from "../public/downQuotationMark.svg";


export default function DownQuotation() {
  
    return (
          <Image
              className="ml-10"
              src={downQuotationMarks}
              alt="Quotation Mark"
              priority
            />
  )
}

