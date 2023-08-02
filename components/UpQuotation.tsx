import Image from "next/image";
import upQuotationMarks from "../public/upQuotationMarks.svg";

export default function UpQuotation() {
  
    return (
   //image of quotation marks
          <Image
              className="ml-10"
              src={upQuotationMarks}
              alt="Quotation Mark"
              priority
            />
  )
}

