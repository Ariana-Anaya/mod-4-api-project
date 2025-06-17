// frontend/src/store/spots.js

import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/Get_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const GET_OWNED_SPOTS = 'spots/GET_OWNED_SPOTS';
//Action Creator 

const getAllSpots = (spots) => {
    return {
    type: GET_SPOTS,
    payload: spots
};
};

const loadSpotAction = (spot) => {
    return {
    type: LOAD_SPOT,
    payload: spot
};
};
const createSpotAction = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot

    };
};
const getOwnedSpotsAction = (spots) =>{
  return{
    type:GET_OWNED_SPOTS,
    payload:spots
  }
}
const updateSpotAction = (spot) => {
  return {
      type: UPDATE_SPOT,
      payload: spot
  };
};

const deleteSpotAction = (spotId) => {
  return {
      type: DELETE_SPOT,
      payload: spotId
  };
};

// Thunks
// Fetch all spots
export const getSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllSpots(data.Spots));
    }
  };
  
  // Fetch a single spot (spotdetails) by ID
  export const getSpotByIdThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(loadSpotAction(data));
    }
  };
  // Fetch all spots for a specific user
export const getUserSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);
  console.log(response)
  if (response.ok) {
      const data = await response.json();
      dispatch(getOwnedSpotsAction(data.Spotss));
      return response;
     // dispatch(getAllSpots(data.Spots)); // Dispatching the action to update the store with user-specific spots
  }
};


  // Create a new spot
  export const createSpotThunk = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spotData),
    });
  
    if (response.ok) {
      const newSpot = await response.json();
      dispatch(createSpotAction(newSpot)); // Add to state
      dispatch(getSpotsThunk()); // Optionally re-fetch all spots
      return newSpot;
    } else {
      const errors = await response.json();
      return errors;
    }
  };  
// export const createSpotThunk = (spotData) => async (dispatch) => {
//   const response = await csrfFetch('/api/spots', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(spotData)
//   });
//   if (response.ok) {
//     const newSpot = await response.json();
//     dispatch(createSpotAction(newSpot)); // Dispatch action to add spot to store
//     return newSpot; // Return the new spot so you can navigate to it
//   } else {
//     const errors = await response.json();
//     return errors; // Handle errors if needed
//   }
// };
//   if (response.ok) {
//     const newSpot = await response.json();
//     dispatch(createSpotAction(newSpot));
//     return newSpot;
//   }
// };
// Update a spot
export const updateSpotThunk = (spotId, spotData) => async (dispatch) => {
  console.log(spotId, spotData)
  const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(spotData),
  });

  if (response.ok) {
      const updatedSpot = await response.json();
      dispatch(updateSpotAction(updatedSpot));
      return updatedSpot; // Optionally return updated spot
  } else {
      const errors = await response.json();
      return errors; // Handle errors if needed
  }
};

// Delete a spot
export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
  });

  if (response.ok) {
      dispatch(deleteSpotAction(spotId));
  } else {
      const errors = await response.json();
      return errors; // Handle errors if needed
  }
};

  // Initial State
  const initialState ={
    allSpots: {},
    singleSpot: {},
    spotsOwnedByCurrentUser:{}
  }

  // Reducer

  const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots } };
            action.payload.forEach((spot) => {        //payload
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case LOAD_SPOT: {
          return {
              ...state,
              singleSpot: action.payload,
          };
    }
    case CREATE_SPOT: {
      const newState = { 
        ...state, 
        allSpots: { ...state.allSpots, [action.payload.id]: action.payload }, 
        singleSpot: action.payload // Optionally update singleSpot to the new spot
      };
      return newState;
    }
  // case CREATE_SPOT: {
  //   const newState = { ...state };
  //   newState.allSpots[action.payload.id] = action.payload;
  //   return newState;
  // }
  case GET_OWNED_SPOTS:{
    const newState = { ...state };
    newState.spotsOwnedByCurrentUser = {};
    action.payload.forEach((spot) => {
      newState.spotsOwnedByCurrentUser[spot.id] = spot;
    });
    return newState;
  }
case UPDATE_SPOT: {
    const newState = { ...state };
    newState.allSpots[action.payload.id] = action.payload; // Update the spot in the state
    return newState;
}
case DELETE_SPOT: {
    const newState = { ...state };
    delete newState.allSpots[action.payload]; // Remove the spot from the state
    return newState;
}
    default:
        return state;
}
};
export default spotsReducer;