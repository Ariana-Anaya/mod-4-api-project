import { createContext, useState, useContext } from "react";

const SpotFormContext = createContext();

export const useSpotFormContext = () => useContext(SpotFormContext); // custom hook for quicker use anywhere

export const SpotFormProvider = ({ children }) => {
  const [spotToEdit, setSpotToEdit] = useState();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  // const [lat, setLat] = useState(27.234897234);
  // const [lng, setLng] = useState(-73.3834583);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [spotImageTwoUrl, setSpotImageTwoUrl] = useState("");
  const [spotImageThreeUrl, setSpotImageThreeUrl] = useState("");
  const [spotImageFourUrl, setSpotImageFourUrl] = useState("");
  const [spotImageFiveUrl, setSpotImageFiveUrl] = useState("");
  const [userErrors, setUserErrors] = useState({});

  const ContextValue = {
    spotToEdit,
    setSpotToEdit,
    country,
    setCountry,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    // lat,
    // lng,
    description,
    setDescription,
    name,
    setName,
    price,
    setPrice,
    previewImageUrl,
    setPreviewImageUrl,
    spotImageTwoUrl,
    setSpotImageTwoUrl,
    spotImageThreeUrl,
    setSpotImageThreeUrl,
    spotImageFourUrl,
    setSpotImageFourUrl,
    spotImageFiveUrl,
    setSpotImageFiveUrl,
    userErrors,
    setUserErrors,
  };
  return (
    <SpotFormContext.Provider value={ContextValue}>
      {children}
    </SpotFormContext.Provider>
  );
};
