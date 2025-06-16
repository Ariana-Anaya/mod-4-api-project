import { csrfFetch } from "./csrf";
import sortByMostRecent from "./sortResources";

const GET_ALL_REVIEWS = "reviews/getAllReviews";
const CREATE_A_REVIEW = "reviews/createAReview";
const EDIT_A_REVIEW = "reviews/editAReview";
const DELETE_A_REVIEW = "reviews/deleteAReview";

// action creators

export const getAllReviews = (reviewsArr) => {
  return {
    type: GET_ALL_REVIEWS,
    reviewsArr,
  };
};

export const createAReview = (newReview) => {
  return {
    type: CREATE_A_REVIEW,
    newReview,
  };
};

export const editAReview = (editedReview) => {
  return {
    type: EDIT_A_REVIEW,
    editedReview,
  };
};

export const deleteAReview = (deletedReviewId) => {
  return {
    type: DELETE_A_REVIEW,
    deletedReviewId,
  };
};

// thunks

export const getAllReviewsOfASpotThunk = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const parsedResponse = await response.json();
    const allReviews = parsedResponse.Reviews;
    // dispatch the action
    dispatch(getAllReviews(allReviews));
    return allReviews;
  } catch (response) {
    const errorResponse = response.json();
    return errorResponse;
  }
};

export const getAllReviewsByUserThunk = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/reviews/current");
    const parsedResponse = await response.json();
    const allReviews = parsedResponse.Reviews;
    dispatch(getAllReviews(allReviews));
    return allReviews;
  } catch (response) {
    const errorResponse = response.json();
    return errorResponse;
  }
};

export const createAReviewForASpotThunk =
  (spotId, reviewObj) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewObj),
      });

      const review = await response.json();
      dispatch(createAReview(review));
      return review;
    } catch (response) {
      const parsedError = await response.json();

      return parsedError;
    }
  };

export const editAReviewThunk =
  (reviewIdToEdit, reviewObj) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/reviews/${reviewIdToEdit}`, {
        method: "PUT",
        body: JSON.stringify(reviewObj),
      });

      const review = await response.json();
      dispatch(editAReview(review));
      return review;
    } catch (response) {
      const parsedError = await response.json();

      return parsedError;
    }
  };

export const deleteAReviewThunk = (reviewId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    const review = await response.json();
    dispatch(deleteAReview(reviewId));
    return review;
  } catch (response) {
    const parsedError = response.json();
    return parsedError;
  }
};

// reducer

const initialState = {
  allReviews: [],
  flattenedReviews: {},
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      const newFlattened = {};
      action.reviewsArr.forEach((review) => {
        newFlattened[review.id] = review;
      });
      const newState = {
        ...state,
        allReviews: sortByMostRecent(action.reviewsArr),
        flattenedReviews: newFlattened,
      };

      return newState;
    }

    case CREATE_A_REVIEW: {
      const newReviewsArray = [action.newReview, ...state.allReviews];
      const newFlattened = {
        ...state.flattenedReviews,
        [action.newReview.id]: action.newReview,
      };

      const newState = {
        allReviews: sortByMostRecent(newReviewsArray),
        flattenedReviews: newFlattened,
      };

      return newState;
    }

    case EDIT_A_REVIEW: {
      // filter out the edited review, and then add that review to the new array that filter returns
      const newReviewsArray = state.allReviews.filter(
        (review) => review.id !== action.editedReview.id
      );
      newReviewsArray.push(action.editedReview);

      // copy flattened and then delete the one edited from flattened, then add the edited one to flattened
      const newFlattened = { ...state.flattenedReviews };
      delete newFlattened[action.editedReview.id]; // removes the old review we edited
      newFlattened[action.editedReview.id] = action.editedReview; // places the edited one into the flattenedReviews object

      const newState = {
        allReviews: sortByMostRecent(newReviewsArray),
        flattenedReviews: newFlattened,
      };

      return newState;
    }

    case DELETE_A_REVIEW: {
      const newReviewsArray = state.allReviews.filter(
        (review) => review.id !== action.deletedReviewId
      );
      const newFlattened = { ...state.flattenedReviews };
      delete newFlattened[action.deletedReviewId];

      const newState = {
        allReviews: sortByMostRecent(newReviewsArray),
        flattenedReviews: newFlattened,
      };

      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
