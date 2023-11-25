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
    <div className='flex flex-col mb-4 md:min-h-[360px]'>
      <div>
        <DownQuotation />
      </div>
      <Paragraph2 className={quoteStyle}>
        {description}
      </Paragraph2>
      <div className='flex mr-4 justify-end'>
        <UpQuotation className="" />
      </div>
    </div>
  );
};

export default ReadMore;