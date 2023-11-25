import Image from 'next/image'
import ReadMore from './ReadMore'
import { testimonialsData } from '../constants/testimonials-data'
import { ItemContainer } from './Carousel/CarouselItemContainer'
import { Heading3 } from './Typography/Heading'
import HomeSection from './HomeSection'
import Slider from "./Carousel/Slider";

const testimonialCardStyle = `
  mx-auto
  border-solid 
  rounded 
  py-8
  my-8 
  font-montserrat 
  items-center 
  text-base 
  text-center 
  w-full
  md:w-1/2
`

function TestimonialItem({ title, body, alt, src }: { title: string, body: string, alt: string, src: string }) {
  return (
    <ItemContainer>
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
  const slides = [
    {
      src: testimonialsData[0].src,
      alt: testimonialsData[0].name,
      title: testimonialsData[0].name,
      description: testimonialsData[0].quote,
      first: true,
    },
    {
      src: testimonialsData[1].src,
      alt: testimonialsData[1].name,
      title: testimonialsData[1].name,
      description: testimonialsData[1].quote,
    },
    {
      src: testimonialsData[2].src,
      alt: testimonialsData[2].name,
      title: testimonialsData[2].name,
      description: testimonialsData[2].quote,
    },
    {
      src: testimonialsData[3].src,
      alt: testimonialsData[3].name,
      title: testimonialsData[3].name,
      description: testimonialsData[3].quote,
    },
  ]

  return (
    <HomeSection>
      <Slider slides={slides.map(slide => {
        return (
          <TestimonialItem
            key={slide.title}
            title={slide.title}
            body={slide.description}
            alt={slide.alt}
            src={slide.src}
          />
        ) as any
      })} />
    </HomeSection>
  )
}