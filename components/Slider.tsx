import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface Slide {
  title: string;
  buttonText: string;
}

interface SliderProps {
  slides: Slide[];
}

const LeftArrow = () => (
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
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
)

const RightArrow = () => (
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
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
)

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const wrappedSlides = [...slides, slides[0]]; // Append the first slide to the end

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true
  });

  const nextSlide = () => {
    if (currentSlide >= wrappedSlides.length - 1) {
      setTransitionEnabled(false);
      setCurrentSlide(0);

      setTimeout(() => {
        setTransitionEnabled(true);
        setCurrentSlide(1);
      }, 50);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setTransitionEnabled(false);
      setCurrentSlide(wrappedSlides.length - 1);

      setTimeout(() => {
        setTransitionEnabled(true);
        setCurrentSlide(wrappedSlides.length - 2);
      }, 50);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slideOffset = -currentSlide * 100;
  const indicatorPosition = currentSlide === wrappedSlides.length - 1 ? 0 : currentSlide;

  return (
    <div
      className="relative w-full overflow-hidden pb-16"
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      {...handlers}
    >
      <div
        className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''} h-full`}
        style={{ transform: `translateX(${slideOffset}%)` }}
      >
        {wrappedSlides.map((slide: any, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 text-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center" aria-live="polite">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          <LeftArrow />
        </button>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === indicatorPosition ? 'true' : undefined}
            className={`h-4 w-4 mx-1 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${index === indicatorPosition ? 'bg-spec-turquoise' : 'bg-gray-300 opacity-20'}`}
          />
        ))}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          <RightArrow />
        </button>
      </div>
    </div>
  );
};

export default Slider;
