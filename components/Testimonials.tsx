import dynamic from "next/dynamic";
import Image from "next/image";
import ReadMore from "./ReadMore";
import { testimonialsData } from "../constants/testimonials-data";
import { ItemContainer } from "./Carousel/CarouselItemContainer";
import { Paragraph2 } from "./Typography/Paragraph";
import { Heading3 } from "./Typography/Heading";


const Carousel = dynamic(() => import("./Carousel/Carousel"), {
  ssr: false,
});

import { openDonatePage, openDocumentationPage } from '../utils/window';

const testimonialCardStyle = `
  mx-auto
  border-solid 
  rounded 
  border-spec-turquiose 
  border-2 
  py-8
  my-8 
  font-montserrat 
  items-center 
  text-base 
  text-center 
  w-full
  md:w-1/2
`
const indicatorStyles = `
  mx-[3px]
  box-content
  h-[10px] 
  w-[10px] 
  md:h-[10px] 
  md:w-[10px] 
  flex-initial 
  cursor-pointer 
  border-2  
  border-solid 
  border-black
  rounded-full 
  bg-green-600
  p-0 
  -indent-[999px] 
  opacity-20
  transition-opacity 
  duration-[600ms] 
  ease-[cubic-bezier(0.25,0.1,0.25,1.0)] 
  motion-reduce:transition-none
`

function TestimonialItem({ title, body, alt, src, first }: { title: string, body: string, alt: string, src: string, first: boolean }) {
  return (
    <ItemContainer first={first}>
      <div className={testimonialCardStyle}>
        <div className="flex justify-center">
          <Image
            src={src}
            alt={title}
            height={120}
            width={120}
            priority
          />
        </div>
        <blockquote className="mb-8">
          <ReadMore description={body} limit={250}/>    
        </blockquote>
        <Heading3 className="content-center text-xl font-medium tracking-widest font-poppins">
          {title}
        </Heading3>
      </div>
    </ItemContainer>
  )
}

export default function Testimonials() {
  // TODO: Clean up data structure.
  const carouselItems = [
    {
      src: testimonialsData[0].src,
      alt: testimonialsData[0].name,
      title: testimonialsData[0].name,
      body: testimonialsData[0].quote,
      first: true,
    },
    {
      src: testimonialsData[1].src,
      alt: testimonialsData[1].name,
      title: testimonialsData[1].name,
      body: testimonialsData[1].quote,
    },
    {
      src: testimonialsData[2].src,
      alt: testimonialsData[2].name,
      title: testimonialsData[2].name,
      body: testimonialsData[2].quote,
    },
    {
      src: testimonialsData[3].src,
      alt: testimonialsData[3].name,
      title: testimonialsData[3].name,
      body: testimonialsData[3].quote,
    },
  ]

  return (
    <div className="w-full m-auto p-2">
      <Carousel
        id="testimonials"
        items={carouselItems}
        indicatorStyles={indicatorStyles}
        itemComponent={TestimonialItem}
      />
    </div>
  )
}