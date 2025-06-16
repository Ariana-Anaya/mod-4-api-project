import { csrfFetch } from "./csrf";
import sortByMostRecent from "./sortResources";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const GET_ALL_SPOTS_BY_USER = "spots/getAllSpotsByUser";
const ADD_NEW_SPOT = "spots/addNewSpot";
const EDIT_A_SPOT = "spots/editASpot";
const DELETE_A_SPOT = "spots/deleteASpot";
const DELETE_SPOT_IMAGE = "spots/deleteSpotImage";
const ADD_SPOT_IMAGE = "spots/addSpotImage";

export const getAllSpots = (spotsArr) => {
  return {
    type: GET_ALL_SPOTS,
    spotsArr,
  };
};

export const getSpotDetails = (spotDetails) => {
  return {
    type: GET_SPOT_DETAILS,
    spotDetails,
  };
};

export const getAllSpotsByUser = (spotsArr) => {
  return {
    type: GET_ALL_SPOTS_BY_USER,
    spotsArr,
  };
};

export const addNewSpot = (newSpot) => {
  return {
    type: ADD_NEW_SPOT,
    newSpot,
  };
};

export const editASpot = (updatedSpot) => {
  return {
    type: EDIT_A_SPOT,
    updatedSpot,
  };
};

export const deleteASpot = (deletedSpotId) => {
  return {
    type: DELETE_A_SPOT,
    deletedSpotId,
  };
};

export const deleteSpotImage = (spotId, deletedImage) => {
  return {
    type: DELETE_SPOT_IMAGE,
    imageData: { spotId, deletedImage },
  };
};

export const addSpotImage = (spotId, newImage) => {
  return {
    type: ADD_SPOT_IMAGE,
    imageData: { spotId, newImage },
  };
};

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const parsedResponse = await response.json();
  const spots = parsedResponse.Spots;
  dispatch(getAllSpots(spots));
};

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const spotDetails = await response.json();
    dispatch(getSpotDetails(spotDetails));
    return spotDetails;
  } catch (response) {
    const parsedError = await response.json();
    return parsedError;
  }
};

export const getAllSpotsByUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  const parsedResponse = await response.json();
  const spots = parsedResponse.Spots;

  dispatch(getAllSpotsByUser(spots));

  return spots;
};

export const createNewSpotThunk = (spotDetails) => async (dispatch) => {
  // in case there are any server side errors with validation, use a try/catch block
  try {
    // talk to the server and offer up this new spot
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify(spotDetails),
    });
    const newSpot = await response.json();
    // dispatch an action to update our redux store
    dispatch(addNewSpot(newSpot));
    // return the spot back to the SpotForm component from where we submitted this request
    return newSpot;
  } catch (response) {
    const errorResponse = response.json();
    // return the error response back to the SpotForm component from where we submitted this request
    return errorResponse;
  }
};

export const editASpotThunk = (spotId, spotDetails) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      body: JSON.stringify(spotDetails),
    });
    const updatedSpot = await response.json();
    dispatch(editASpot(updatedSpot));
    return updatedSpot;
  } catch (response) {
    const errorResponse = await response.json();
    return errorResponse;
  }
};

export const deleteASpotThunk = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });

    const confirmation = await response.json();

    dispatch(deleteASpot(spotId));

    return confirmation;
  } catch (response) {
    const errorResponse = await response.json();
    errorResponse.error = "We were unable to delete this spot";
    return errorResponse;
  }
};

export const addImageToSpotThunk = (spotId, imageData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      body: JSON.stringify(imageData),
    });
    const newImage = await response.json();
    dispatch(addSpotImage(spotId, newImage));
    return newImage;
  } catch (response) {
    const errorResponse = await response.json();
    return errorResponse;
  }
};

export const deleteSpotImageThunk = (spotId, imageData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spot-images/${imageData.id}`, {
    method: "DELETE",
  });
  const parsedResponse = await response.json();
  dispatch(deleteSpotImage(spotId, imageData));
  return parsedResponse;
};

const initialState = {
  spotsArray: [],
  spotsFlattened: {},
  currentSpotDetails: {},
};
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const spotsObj = {};
      action.spotsArr.forEach((spot) => {
        spotsObj[spot.id] = spot;
      });

      const newState = {
        ...state,
        spotsArray: sortByMostRecent(action.spotsArr),
        spotsFlattened: spotsObj,
      };

      return newState;
    }

    case GET_SPOT_DETAILS: {
      const newState = { ...state };
      const newCurrentSpotDetails = action.spotDetails;
      newState.currentSpotDetails = newCurrentSpotDetails;
      return newState;
    }

    case GET_ALL_SPOTS_BY_USER: {
      const spotsObj = {};
      action.spotsArr.forEach((spot) => {
        spotsObj[spot.id] = spot;
      });
      const newState = {
        ...state,
        spotsArray: sortByMostRecent(action.spotsArr),
        spotsFlattened: spotsObj,
      };
      return newState;
    }

    case ADD_NEW_SPOT: {
      const newState = { ...state }; // whatever the state is currently; this can be impacted by refreshing and by navigating to different pages that dispatch different thunks/actions on mount
      // the new spot won't have all the same data that the others do.  The route GET api/spots returns previewImage and avgRating properties that the POST api/spots does not.
      newState.spotsArray = sortByMostRecent([
        action.newSpot,
        ...newState.spotsArray,
      ]);
      newState.spotsFlattened = {
        ...newState.spotsFlattened,
        [action.newSpot.id]: action.newSpot,
      };

      newState.currentSpotDetails = action.newSpot;

      return newState;
    }

    case EDIT_A_SPOT: {
      const newState = { ...state };
      // copy the array of spots that we just copied into newState
      const updatedSpots = newState.spotsArray.slice();
      // perform mutations on the copy only
      const indexOfUpdatedSpot = updatedSpots.findIndex(
        (spot) => spot.id === action.updatedSpot.id
      );
      updatedSpots.splice(indexOfUpdatedSpot, 1);
      // reassign the newState's spotsArray to be the copied array after splicing out the one we're updating
      newState.spotsArray = sortByMostRecent([
        action.updatedSpot,
        ...updatedSpots,
      ]);
      // reassign the spotsFlattened to a copy of itself but with the newly updated spot replacing the one that was there
      newState.spotsFlattened = {
        ...newState.spotsFlattened,
        [action.updatedSpot.id]: action.updatedSpot,
      };

      return newState;
    }

    case DELETE_A_SPOT: {
      const newState = { ...state };
      // reassign newState.spotsArray
      const newSpotsArray = newState.spotsArray.filter(
        (spot) => spot.id !== action.deletedSpotId
      );
      newState.spotsArray = sortByMostRecent(newSpotsArray);
      // now reassign newState.spotsFlattened
      const newSpotsFlattened = { ...newState.spotsFlattened };
      delete newSpotsFlattened[action.deletedSpotId];
      newState.spotsFlattened = newSpotsFlattened;

      newState.currentSpotDetails = {}; // for testing, so that I could see a page go blank if I deleted a spot by dispatch a delete action directly through the window.store.spotActions.deleteASpot(spotId)

      return newState;
    }

    case ADD_SPOT_IMAGE: {
      const newState = { ...state };
      const { spotId, newImage } = action.imageData;
      if (newImage.preview) {
        // then reassign newState.spotsArray to a new array where this image's url is at the correct spot as its previewImage
        const newSpotsArray = newState.spotsArray.map((spotObj) => {
          // replace the previewImage on the one whose id matches the action's id
          if (spotObj.id === spotId) {
            spotObj = { ...spotObj, previewImage: newImage.url };
          }
          // then return all of the spot objects, so we don't leave out any spots in the array we're assigning to newState.spotsArray
          return spotObj;
        });

        newState.spotsArray = sortByMostRecent(newSpotsArray);

        // update the spotsFlattened to reflect the correct previewImage since this newly added image is the preview
        newState.spotsFlattened = {
          ...newState.spotsFlattened,
          [spotId]: {
            ...newState.spotsFlattened[spotId],
            previewImage: newImage.url,
          },
        };
      }

      // update the state of spots
      return newState;
    }

    case DELETE_SPOT_IMAGE: {
      // shallow copy the state object
      const newState = { ...state };
      // pull out the values from the action object
      const { spotId, deletedImage } = action.imageData;
      // if the image we're deleting is the preview image for any one of the objects in newState.spotsArray
      if (deletedImage.preview) {
        // we know we need to reassign newState.spotsArray to a new array
        const newSpotsArray = newState.spotsArray.map((spotObj) => {
          if (spotObj.id === spotId) {
            spotObj = { ...spotObj, previewImage: null };
          }

          return spotObj;
        });

        newState.spotsArray = sortByMostRecent(newSpotsArray);

        // now reassign the spotsFlattened to a new object
        newState.spotsFlattened = {
          ...newState.spotsFlattened,
          [spotId]: {
            ...newState.spotsFlattened[spotId],
            previewImage: null,
          },
        };
      }

      // tell redux about the newly deleted image on the currentSpotDetails; for ALL deleted images, not just preview images

      const newSpotImages = [...newState.currentSpotDetails.SpotImages]; // this is guaranteed to be here because the spots/spotId/edit page is the only path that could lead to this thunk being called.  That page sets the currentSpotDetails to the spot being edited.  guarnateed to have at least 1 image, as the preview image.
      // find the index of the image that was deleted.
      const indexOfDeletedImage = newSpotImages.findIndex(
        (spotImage) => spotImage.id === deletedImage.id
      );

      // splice that index out of the newSpotImages array, understanding .splice() returns an array of the deleted item(s).
      // splice will mutate newSpotImages.  So we don't need to capture the return value.
      newSpotImages.splice(indexOfDeletedImage, 1);

      // now, reassign the value of newState.currentSpotDetails.SpotImages to be the new reference we made (which doesn't include the deleted image object)
      newState.currentSpotDetails.SpotImages = newSpotImages;

      return newState;
    }

    default:
      return state;
  }
};

export default spotsReducer;
