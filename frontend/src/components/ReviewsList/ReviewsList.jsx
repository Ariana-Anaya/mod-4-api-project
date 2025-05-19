import Review from "./Review";
import "./ReviewsList.css";

const ReviewsList = ({ reviewsArr }) => {
  return (
    <div className="reviews-list col">
      {reviewsArr.map((review) => {
        return <Review key={review.id} currentReview={review} />;
      })}
    </div>
  );
};

export default ReviewsList;
