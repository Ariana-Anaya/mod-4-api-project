import { useReviewFormContext } from "../../context/ReviewFormContext";
import { useEffect } from "react";
import ReviewForm from "../ReviewForm";

const ReviewFormModal = ({ spotName, reviewObj }) => {
  const {
    setReviewText,
    setStarRating,
    setButtonDisabled,
    setUserErrors,
    setButtonText,
  } = useReviewFormContext();

  useEffect(() => {
    // reset any errors
    setUserErrors({});

    if (!reviewObj) {
      setReviewText("");
      setStarRating(0);
      setButtonDisabled(true);
      setButtonText("Submit");
    } else {
      setReviewText(reviewObj.review);
      setStarRating(reviewObj.stars);
      setButtonDisabled(false);
      setButtonText("Update");
    }
  }, [
    reviewObj,
    setReviewText,
    setStarRating,
    setButtonDisabled,
    setButtonText,
    setUserErrors,
  ]);

  return (
    <section className="modal-container">
      <h2>{`How was your stay${spotName ? ` at ${spotName}` : ""}?`}</h2>
      <ReviewForm reviewToEdit={reviewObj} />
    </section>
  );
};

export default ReviewFormModal;
