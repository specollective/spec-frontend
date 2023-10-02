import { Heading3 } from "../Typography/Heading"
import { Paragraph1 } from "../Typography/Paragraph"
import Link from "next/link"

export default function GetInvolvedCard({ cardData, index }: { cardData: any, index: number }) {
  let subcardClasses = "overflow-hidden shadow-xl "

  if (index === 0) {
    subcardClasses += "rounded-tl-3xl rounded-br-3xl"
  } else if (index === 1) {
    subcardClasses += "rounded-br-3xl"
  } else if (index === 2) {
    subcardClasses += "rounded-tr-3xl rounded-bl-3xl"
  }

  return (
    <div key={index} className="">
      <div className={subcardClasses}>
        <Heading3 className="bg-spec-lightTurquiose py-2 text-center font-dmserif font-bold">
          {cardData.title}
        </Heading3>
        
        <div className="bg-spec-white font-montserrat flex flex-col relative justify-between h-60 w-80">
          <Paragraph1 className="px-10 py-0">
            {cardData.body}
          </Paragraph1>

          <Link
            href="/home/#contact-form"
            className="text-lg font-semibold underline text-center pb-6"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
}