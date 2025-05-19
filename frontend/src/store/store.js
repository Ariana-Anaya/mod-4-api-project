import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import  thunk  from "redux-thunk";
import sessionReducer from "./session";
import spotsReducer from "./spots";
import reviewsReducer from "./reviews";


const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer,
});


let enhancer;

if (import.meta.env.MODE !== "production") {
  // development
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(logger, thunk));
} else {
  // production
  enhancer = applyMiddleware(thunk);
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
