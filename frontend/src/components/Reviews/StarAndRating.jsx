import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
    
    const StarAndRating = ({ rating, onChange }) => {
    const [activeRating, setActiveRating] = useState(rating);
    const starNums = [1, 2, 3, 4, 5];
  
    const handleClassName = (starNumber) => {
      return starNumber > activeRating ? 'empty' : 'filled';
    };
  
    const propsByStar = (starNumber) => {
      return {
        className: handleClassName(starNumber),
        onMouseEnter: () => setActiveRating(starNumber),
        onMouseLeave: () => setActiveRating(rating),
        onClick: () => {
          setActiveRating(starNumber);
          onChange(starNumber);
        },
      };
    };
  
    return (
      <div className="rating-input">
        {starNums.map((num) => (
          <div key={num} {...propsByStar(num)}>
            <FontAwesomeIcon icon={faStar} />
          </div>
        ))}
        <div className="rating-value">{activeRating} / 5</div>
      </div>
    );
  };
  export default StarAndRating;