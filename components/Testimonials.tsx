import Image from 'next/image'
import ReadMore from './ReadMore'
import { testimonialsData } from '../constants/testimonials-data'
import { Heading3 } from './Typography/Heading'
import HomeSection from './HomeSection'
import Slider from './Slider';

const testimonialCardStyle = `
  mx-auto
  border-solid
  md:border-2
  md:border-spec-turquiose
  rounded 
  md:py-8
  md:my-8 
  font-montserrat 
  items-center 
  text-base 
  text-center 
  w-full
  md:w-2/3
`

function ActiveItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-active
      data-te-carousel-item
      style={{backfaceVisibility: 'hidden'}}>
      {children}
    </div>
  )
}

export function ItemContainer({ children }: { children: React.ReactNode }) {
  return (
    <ActiveItem>{children}</ActiveItem>
  )
}

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
        <Heading3 className="content-center text-xl font-medium tracking-widest font-poppins pt-10">
          {title}
        </Heading3>
        <blockquote className="mb-8">
          <ReadMore description={body} limit={250}/>    
        </blockquote>
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
    <div className="pt-10">
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
    </div>
  )
}