import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { FaStar } from "react-icons/fa6";
import "./Review.css";

const Review = ({ currentReview }) => {
  const { spotId } = useParams(); // for use when rendering the h2 of the Review component
  const currentUser = useSelector((state) => state.session.user); // null if no user is logged in
  const flattenedSpots = useSelector((state) => state.spots.spotsFlattened); // possibly an empty {}
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());

    const dateString = currentReview?.createdAt;

    if (!dateString) return;

    const monthAndYear = dateString.split(" ")[0].split("-");

    const monthMap = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    setMonth(monthMap[monthAndYear[1]]);
    setYear(monthAndYear[0]);
  }, [setMonth, setYear, currentReview, dispatch]);

  /* even though currentReview is passed in as a prop, that prop depends on a useEffect so we still need conditional chaining */
  return (
    <div className="review col">
      {/* useParams tells us the location where this component is rendering, so !spotId tells us we are on the ManageReviewsPage */}
      <div className="review-title-and-stars flex-container">
        <h2>
          {!spotId
            ? flattenedSpots[currentReview?.spotId]?.name
            : currentReview?.User?.firstName}
        </h2>
        <div className="star-icons flex-container">
          {Array(currentReview?.stars)
            .fill(null)
            .map((_, index) => {
              return (
                <div key={index} className="star-icon">
                  {" "}
                  <FaStar />{" "}
                </div>
              );
            })}
        </div>
      </div>
      <p className="review-date">{`${month} ${year}`}</p>
      <p className="review-text">{currentReview?.review}</p>
      {currentReview && currentUser?.id === currentReview?.userId && (
        <div className="review-control-buttons flex-container">
          <OpenModalButton
            controllerText="Update"
            customClasses="review-control-button small-button"
            elementName="button"
            modalComponent={
              <ReviewFormModal
                spotName={flattenedSpots[currentReview?.spotId]?.name}
                reviewObj={currentReview}
              />
            }
          />
          <OpenModalButton
            controllerText="Delete"
            customClasses="review-control-button small-button"
            elementName="button"
            modalComponent={
              <DeleteConfirmationModal
                confirmationMessage="Are you sure you want to delete this review?"
                subjectType="review"
                subjectId={currentReview?.id}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Review;
