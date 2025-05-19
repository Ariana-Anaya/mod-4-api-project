import { useReviewFormContext } from "../../context/ReviewFormContext";
import { useEffect } from "react";
import FormField from "../FormField";
import ErrorText from "../ErrorText";
import StarRating from "../StarRating";
import {
  createAReviewForASpotThunk,
  editAReviewThunk,
} from "../../store/reviews";
import { getSpotDetailsThunk } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";

const ReviewForm = ({ reviewToEdit }) => {
  const {
    reviewText,
    setReviewText,
    starRating,
    buttonDisabled,
    setButtonDisabled,
    buttonText,
    userErrors,
    setUserErrors,
  } = useReviewFormContext();

  const spotId = useSelector((state) => state.spots.currentSpotDetails.id);

  const dispatch = useDispatch();

  const { closeModal } = useModal();

  useEffect(() => {
    if (reviewText.length >= 10 && starRating >= 1) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [reviewText, starRating, setButtonDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewDetails = {
      stars: starRating,
      review: reviewText,
    };

    let newReview;
    if (reviewToEdit) {
      newReview = await dispatch(
        editAReviewThunk(reviewToEdit.id, reviewDetails)
      );
    } else {
      newReview = await dispatch(
        createAReviewForASpotThunk(spotId, reviewDetails)
      );
    }

    if (newReview && spotId) {
      dispatch(getSpotDetailsThunk(spotId));
    }

    if (newReview.message) {
      setUserErrors({ serverError: newReview.message });
    } else {
      closeModal();
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {userErrors.serverError && <ErrorText text={userErrors.serverError} />}
      <FormField
        inputId="review-text-input"
        inputType="textarea"
        inputVal={reviewText}
        setInputVal={setReviewText}
        labelText="Leave your review here..."
      />
      <div className="flex-container star-row">
        <StarRating />
        <span>Stars</span>
      </div>

      <button
        disabled={buttonDisabled}
        type="submit"
        className={`full-width-button ${
          !buttonDisabled ? " active-button" : ""
        } `}
      >
        {`${buttonText} Your Review`}
      </button>
    </form>
  );
};

export default ReviewForm;
