import React,{useState} from 'react';

//declare type for description and limit
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
  mb-4 p-6  
  text-gray-900 
  dark:text-black 
  sm:text-ellipsis 
  sm:overflow-hidden 
  `

// const ReadMore: ({ description, limit }: ReadMoreProps) => string | JSX.Element
const ReadMore = ({ description, limit }: ReadMoreProps) => {
  
    const [showAll, setShowAll] = useState(false);
  return (
    description.length > limit ? (
      <div>
        <>
        {showAll ? (
            <div>
              <p className={quoteStyle}>
                 {description}
              </p>
            <button
              onClick={() => setShowAll(false)}
              className="text-primary"
            >
              Read Less
            </button>
          </div>
        ) : (
              <div>
                <p className={quoteStyle}>
                       {description.substring(0, limit).concat("...")}
                </p>
        
            <button onClick={() => setShowAll(true)} className="text-primary">
              Read More
            </button>
          </div>
          )}
          </>
      </div>
    
    ) : (
        <>
          
            description
            
       
          </>
    )
        
  );
       
       
  };
  export default ReadMore;