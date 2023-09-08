import Image from "next/image";


export default function UpQuotation() {
  
    return (
   //image of quotation marks
          <Image
              // className="ml-10 float-right visible md:hidden"
              // className="ml-10 float-right"
              className="flex flex-col-reverse mb-4"
              src={"/upQuotationMarks.svg"}
        alt="Quotation Mark"
          width={50}
          height={50}
          // priority
            />
  )
}

