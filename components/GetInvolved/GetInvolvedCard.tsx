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
    <div key={index} className="w-full">
      <div className={subcardClasses}>
        <div className="bg-spec-lightTurquoise h-24 flex items-center justify-center px-4">
          <Heading3 className="text-center font-dmserif font-bold">
            {cardData.title}
          </Heading3>
        </div>

        <div className="bg-spec-white font-montserrat flex flex-col h-72 py-8 px-6">
          <Paragraph1 className="text-center flex-1">
            {cardData.body}
          </Paragraph1>

          <Link
            href="/home/#contact-form"
            className="text-base font-semibold underline text-center hover:text-spec-turquoise transition-colors focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2 py-2 mt-auto"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
}