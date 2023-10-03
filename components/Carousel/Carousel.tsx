import { useEffect } from 'react';
import { Carousel, initTE } from 'tw-elements';

function CarouselItems({ items, itemComponent }: { items: any[], itemComponent: any }) {
  const Item = itemComponent;

  return (
    <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
      {items.map((item, index) => (
        <Item
          key={index}
          title={item.title}
          body={item.body}
          alt={item.alt}
          src={item.src}
          first={item.first}
        />
        )
      )}
    </div>
  )
}

// TODO see if we can use dynamic property data-te-carousel="active" instead of separate components.
function ActiveButton({ dataTarget, index, item, className }: { index: number, item: any, className: string, dataTarget: string }) {
  return (
    <button
      type="button"
      data-te-target={`#${dataTarget}`}
      data-te-slide-to={String(index)}
      data-te-carousel-active
      className={className}
      aria-current="true"
      aria-label={item.title}> 
    </button>
  )
}

function InactiveButton({ dataTarget, index, item, className }: { dataTarget: string, index: number, item: any, className: string }) {
  return (
    <button
      type="button"
      data-te-target={`#${dataTarget}`}
      data-te-slide-to={String(index)}
      className={className}
      aria-current="true"
      aria-label={item.title}> 
    </button>
  )
}

function IndicatorButton({ dataTarget, index, item, buttonStyles }: { dataTarget: string, index: number, item: any, buttonStyles: string }) {
  const Button = item.first ? ActiveButton : InactiveButton;

  return (
    <Button dataTarget={dataTarget} index={index} item={item} className={buttonStyles} />
  )
}

function CarouselBottomIndicators({ dataTarget, items, buttonStyles }: { dataTarget: string, items: any[], buttonStyles: string}) {
  return (
    <div
      className="mx-[15%] mb-4 flex list-none justify-center p-0"
      data-te-carousel-indicators
    >
      {items.map((item, index) => (
        <IndicatorButton
          dataTarget={dataTarget}
          buttonStyles={buttonStyles}
          key={index}
          index={index}
          item={item}
        />
      ))}
    </div>
  )
}

export function CarouselNextAndPreviousButtons({ dataTarget } : { dataTarget: string }) {
  return (
    <div>
      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex hidden md:block w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target={`#${dataTarget}`}
        data-te-slide="prev">
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex hidden md:block w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target={`#${dataTarget}`}
        data-te-slide="next">
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>
  )
}

interface CustomCarouselProps {
  id: string;
  items: any[];
  itemComponent: any;
  indicatorStyles: string;
}

export default function CustomCarousel({ id, items, itemComponent, indicatorStyles }: CustomCarouselProps) {
  useEffect(() => {
    initTE({ Carousel });
  }, []);

  return (
    <div
      id={id}
      className="relative"
      data-te-carousel-init
      data-te-carousel-slide
      data-te-ride="carousel"
    >
      <CarouselItems items={items} itemComponent={itemComponent} />
      <CarouselBottomIndicators items={items} buttonStyles={indicatorStyles} dataTarget={id} />
      <CarouselNextAndPreviousButtons dataTarget={id} />
    </div>
  )
}