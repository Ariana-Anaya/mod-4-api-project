import { createContext, useState, useContext } from "react";

const ReviewFormContext = createContext();

export const useReviewFormContext = () => useContext(ReviewFormContext); // custom hook for quick use throughout consumer components

export const ReviewFormProvider = ({ children }) => {
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Submit");
  const [userErrors, setUserErrors] = useState({});
  //   const [reviewImageOneUrl, setReviewImageOneUrl] = useState("");
  //   const [reviewImageTwoUrl, setReviewImageTwoUrl] = useState("");
  //   const [reviewImageThreeUrl, setReviewImageThreeUrl] = useState("");
  //   const [reviewImageFourUrl, setReviewImageFourUrl] = useState("");
  //   const [reviewImageFiveUrl, setReviewImageFiveUrl] = useState("");
  //   const [reviewImageSixUrl, setReviewImageSixUrl] = useState("");
  //   const [reviewImageSevenUrl, setReviewImageSevenUrl] = useState("");
  //   const [reviewImageEightUrl, setReviewImageEightUrl] = useState("");
  //   const [reviewImageNineUrl, setReviewImageNineUrl] = useState("");
  //   const [reviewImageTenUrl, setReviewImageTenUrl] = useState("");

  const ContextValue = {
    reviewText,
    setReviewText,
    starRating,
    setStarRating,
    buttonDisabled,
    setButtonDisabled,
    buttonText,
    setButtonText,
    userErrors,
    setUserErrors,
  };

  return (
    <ReviewFormContext.Provider value={ContextValue}>
      {children}
    </ReviewFormContext.Provider>
  );
};
