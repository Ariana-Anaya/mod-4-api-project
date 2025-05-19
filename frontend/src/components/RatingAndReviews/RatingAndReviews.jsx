import SpotRating from "../SpotRating";
import NumReviews from "../NumReviews";
import { useSelector } from "react-redux";
import "./RatingAndReviews.css";

const RatingAndReviews = () => {
  const currentSpot = useSelector((state) => state.spots.currentSpotDetails);
  return (
    <div className={"rating-and-review flex-container"}>
      <SpotRating rating={currentSpot?.avgStarRating} />
      {currentSpot?.numReviews > 0 && (
        <>
          <div className="circle-dot flex-container">•</div>
          <NumReviews />
        </>
      )}
    </div>
  );
};

export default RatingAndReviews;
