import Image from "next/image";
import upQuotationMarks from "../public/twitter-logo.svg";

export default function UpQuotation() {
  
    return (
   //image of quotation marks
          <Image
              className="ml-10"
              src={upQuotationMarks}
        alt="Quotation Mark"
          width={100}
          height={100}
              
            />
  )
}

