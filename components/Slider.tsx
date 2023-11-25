import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface Slide {
  title: string;
  buttonText: string;
}

interface SliderProps {
  slides: Slide[];
}

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

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true
  });

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      // Disable the transition for immediate jump
      setTransitionEnabled(false);
      setCurrentSlide(0);

      // Re-enable the transition for smooth effect
      setTimeout(() => {
        setTransitionEnabled(true);
      }, 1000); // Timeout of 0 to push to end of call stack
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setTransitionEnabled(false);
      setCurrentSlide(slides.length - 1);
      
      setTimeout(() => {
        setTransitionEnabled(true);
      }, 1000);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slideOffset = -currentSlide * 100; // 100% for each slide

  return (
    <div className="relative w-full overflow-hidden" {...handlers}>
      <div 
        className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''} h-full`} 
        style={{ transform: `translateX(${slideOffset}%)` }}
      >
        {slides.map((slide: any, index) => (
          <div key={index} className="w-full flex-shrink-0 text-center">
            {slide}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
        <button onClick={prevSlide}>
          <LeftArrow />
        </button>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${index === currentSlide ? 'bg-green-600 border-2 border-black h-4 w-4 transition-opacity duration-500 ease-in-out motion-reduce:transition-none' : 'bg-gray-300 border-2 border-black w-4 h-4 opacity-20'}`}
          ></span>
        ))}
        <button onClick={nextSlide}>
          <RightArrow />
        </button>
      </div>
    </div>
  );
};

export default Slider;
