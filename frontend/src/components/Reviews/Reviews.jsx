import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotReviewsThunk, createReviewThunk, deleteReviewThunk } from '../../store/review';
import './Reviews.css'; 
export function Reviews({ spotId ,  RefechReviewChange}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews.spotReviews);
  const spot = useSelector(state => state.spots.singleSpot);


  const allReviews = Object.values(reviews);


  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId))
  }, [dispatch, spotId]);

  let canPostReview = false;

  if (sessionUser && spot) { 
    const hasUserReviewed = allReviews.find(review => review.userId === sessionUser.id); 
    const isOwner = sessionUser.id === spot.ownerId; 
    if (!hasUserReviewed && !isOwner) { 
      canPostReview = true;
    }
}


  const handleDeleteClick = (reviewId) => {
    setShowDeleteModal(true);
    setReviewIdToDelete(reviewId);
  }

  const handleComfirmDelete = async () => {
    try {
      if(reviewIdToDelete){
        await dispatch(deleteReviewThunk(reviewIdToDelete));
        await  RefechReviewChange ();
        setShowDeleteModal(false);
        setReviewIdToDelete(null);
      }

    } catch (error) {
      console.error("Error deleting review:", error);
    }

  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setReviewIdToDelete(null);
  }
  
  const handleOpenModal = () => {
    setShowModal(true);
    setReviewText('');
    setRating(0);
    setErrors({});
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStarHover = (hoveredRating) => {
    if (!rating) setRating(hoveredRating);
  };

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setErrors({});
  
    if (reviewText.length < 10) {
      setErrors({review: "Review must be at least 10 characters long"});
      return;
    }
    if (rating === 0) {
      setErrors({rating: "Please select a star rating"});
      return;
    }
  
    const reviewData = { review: reviewText, stars: rating };
    try {
      const result = await dispatch(createReviewThunk(spotId, reviewData));
      if (result && result.id) {
        handleCloseModal();
        dispatch(getSpotReviewsThunk(spotId)); 
      } else {
        setErrors({ submission: "Failed to submit review. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrors({ submission: "An error occurred. Please try again." });
    }
  };

 

  const averageRating = allReviews.length ? allReviews.reduce((sum, review) => sum + review.stars, 0) / allReviews.length.toFixed(1) : 'New';

const sortedReviews = Object.values(reviews).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div className="reviews-section">
      
      <h2>
          ★{" "}
          {averageRating > 0 && allReviews.length !== 0
            ? ` ${averageRating.toFixed(1)} · ${allReviews.length} ${
                allReviews.length > 1 ? "reviews" : "review"
              }`
            : "New"}
        </h2>
      
      {canPostReview && (
        <button onClick={handleOpenModal} className="post-review-button">Post Your Review</button>
      )}
      
      {allReviews.length === 0 && canPostReview && (
        <p className="no-reviews-text">Be the first to post a review!</p>
      )}

      {showModal && (
        <div className="review-modal">
          <h3>How was your stay?</h3>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Leave your review here..."
          />
          {errors.review && <p className="error">{errors.review}</p>}
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => handleStarHover(0)}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
            <span>Stars</span>
          </div>
          {errors.rating && <p className="error">{errors.rating}</p>}
          <button 
            onClick={handleSubmitReview} 
            disabled={reviewText.length < 10 || rating === 0}
          >
            Submit Your Review
          </button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      )}
          {sortedReviews.map((review) => (
      <div key={review.id} className="review">
        <h3>{review.User.firstName}</h3>
        <p>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        <p>{review.review}</p>

        {sessionUser && sessionUser.id === review.userId && (
          <button onClick={() => handleDeleteClick(review.id)}>
            Delete
          </button>
        )}
      </div>
    ))}
      


         {showDeleteModal && (
              <div className = "delete-container">
              <h2>Confirm Delete</h2>
              <h4>Are you sure you want to delete this review?</h4>
              <button onClick={handleComfirmDelete} className= "confirm-delete-button">Yes ( Deleted Review )</button>
              <button onClick={ handleCancelDelete } className= "cancel-delete-button" >No ( Kepp Review )</button>
            </div>
          )}





    </div>
  )
}
export default Reviews;