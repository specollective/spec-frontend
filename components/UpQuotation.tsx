import Image from "next/image";


export default function UpQuotation() {
  
    return (
   //image of quotation marks
          <Image
              className="ml-10"
              src={"/UpQuotationMarks.svg"}
        alt="Quotation Mark"
          width={50}
          height={50}
              
            />
  )
}

