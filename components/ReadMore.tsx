import React, { useState } from 'react';
import DownQuotation from './DownQuotation';
import UpQuotation from "./UpQuotation";
import { Paragraph2 } from './Typography/Paragraph';

// Declare type for description and limit
interface ReadMoreProps {
  description: string;
  limit: number;
  className?: string;
}

const quoteStyle = `
  text-md 
  md:text-lg 
  font-montserrat 
  font-light 
  italic 
  p-4
  mx-8
  text-gray-900 
  dark:text-black 
  sm:text-ellipsis 
  sm:overflow-hidden 
`
const ReadMore = ({ description, limit }: ReadMoreProps) => {
  const [showAll, setShowAll] = useState(false);
  return (
    description.length > limit ? (
      <div>
        <>
          {showAll ? (
              <div>
                <div className='flex flex-col mb-4'>
                  <DownQuotation />
                </div>
                <div>
                  <p className={quoteStyle}>
                    {description}
                  </p>
                </div>
                <div className='flex mr-4 justify-end'>
                  <UpQuotation className="" />
                </div>
              <button
                onClick={() => setShowAll(false)}
                className="text-dmserif mb-4"
              >
                Read Less
              </button>
            </div>
          ) : (
            <div>
              <div className='flex flex-col mb-4'>
                <DownQuotation />
                <Paragraph2 className={quoteStyle}>
                  {description.substring(0, limit).concat("...")}
                </Paragraph2>
                
                <div className='flex mr-4 justify-end'>
                  <UpQuotation className="" />
                </div>
              </div>
              <button onClick={() => setShowAll(true)} className="text-dmserif mb-4">
                Read More
              </button>
            </div>
          )}
        </>
      </div>
    ) : (<>description</>)
  );
};

export default ReadMore;