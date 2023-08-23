import React,{useState} from 'react';

//declare type for description and limit
interface ReadMoreProps {
    description: string;
    limit: number;
}

// const ReadMore: ({ description, limit }: ReadMoreProps) => string | JSX.Element
const ReadMore = ({ description, limit }:ReadMoreProps) => {
    const [showAll, setShowAll] = useState(false);
    return (
        description.length > limit ? (
          <div>
            {showAll ? (
              <div>
                {description}        
                <button 
                  onClick={() => setShowAll(false)}
                  className="text-primary"
                >
                  Read Less
                </button>
              </div>
            ) : (
              <div>
                {description.substring(0, limit).concat("...")}
                <button onClick={() => setShowAll(true)} className="text-primary">
                  Read More
                </button>
              </div>
            )}
          </div>
        ) : (
          description
        )
    );
  };
  export default ReadMore;