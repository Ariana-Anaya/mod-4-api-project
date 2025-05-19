import { useReviewFormContext } from "../../context/ReviewFormContext";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import "./StarRating.css";

const StarRating = () => {
  const { starRating, setStarRating } = useReviewFormContext();
  const [activeRating, setActiveRating] = useState(); // when setting the initial value to be based on another slice of state, wait until the component renders (so use a useEffect hook) to initialize the state
  const MAX_STARS = 5; // this can now be changed in one place and star options will be reflected

  useEffect(() => {
    setActiveRating(starRating);
  }, [starRating, setActiveRating]);

  const starClassName = "flex-container star-icon";

  const getNumStars = (idString) => {
    const index = idString.indexOf("_");
    const numStars = Number(idString.slice(index + 1));

    return numStars;
  };

  return (
    <div className="star-icons flex-container">
      {Array(MAX_STARS)
        .fill(null)
        .map((_, index) => {
          return (
            <div
              key={index}
              id={`star_${index + 1}`}
              onMouseEnter={(e) => {
                setActiveRating(
                  getNumStars(e.currentTarget.getAttribute("id"))
                );
              }}
              onMouseLeave={() => {
                setActiveRating(starRating);
              }}
              onClick={(e) => {
                setStarRating(getNumStars(e.currentTarget.getAttribute("id")));
              }}
              className={`${starClassName} ${
                activeRating > index ? "selected" : ""
              }`}
            >
              <FaStar />
            </div>
          );
        })}
    </div>
  );
};

export default StarRating;
