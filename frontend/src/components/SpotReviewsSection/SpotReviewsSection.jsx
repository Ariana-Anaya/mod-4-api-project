import RatingAndReviews from "../RatingAndReviews";
import {
  spotBelongsToCurrentUser,
  userHasReviewedThisSpot,
} from "./spotReviewHelpers";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllReviewsOfASpotThunk } from "../../store/reviews";
import ReviewsList from "../ReviewsList";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";

const SpotReviewsSection = () => {
  const userId = useSelector((state) => state.session.user?.id); // user is possibly null if no one is logged in
  const currentSpot = useSelector((state) => state.spots.currentSpotDetails); // {} when component first mounts becuase its parent component is running a thunk which dispatches an action to update this object to a populated one.
  const reviewsForCurrentSpot = useSelector(
    (state) => state.reviews.allReviews
  ); // [] when component first mounts
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentSpot.id) return;
    dispatch(getAllReviewsOfASpotThunk(currentSpot.id));
  }, [dispatch, currentSpot]);

  return (
    <section className="spot-reviews-section">
      <RatingAndReviews />
      {userId &&
        !spotBelongsToCurrentUser(userId, currentSpot.ownerId) &&
        !userHasReviewedThisSpot(reviewsForCurrentSpot, userId) && (
          <OpenModalButton
            customClasses="review-control-button post-review-button small-button"
            controllerText="Post Your Review"
            elementName="button"
            modalComponent={<ReviewFormModal />}
          />
        )}

      <>
        {reviewsForCurrentSpot.length > 0 ? (
          <ReviewsList reviewsArr={reviewsForCurrentSpot} />
        ) : (
          <>
            {userId &&
              !spotBelongsToCurrentUser(userId, currentSpot.ownerId) && (
                <div className="reviews-list">
                  <p>Be the first to post a review!</p>
                </div>
              )}
          </>
        )}
      </>
    </section>
  );
};

export default SpotReviewsSection;
