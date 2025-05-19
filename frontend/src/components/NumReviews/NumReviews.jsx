import { useSelector } from "react-redux";
import "./NumReviews.css";

const NumReviews = () => {
  const numReviews = useSelector(
    (state) => state.spots.currentSpotDetails?.numReviews
  );
  let text;

  if (numReviews === 1) {
    text = "review";
  } else {
    text = "reviews";
  }

  return (
    <p className="flex-container num-reviews-text">
      <span>{numReviews}</span>
      <span>{text}</span>
    </p>
  );
};

export default NumReviews;
