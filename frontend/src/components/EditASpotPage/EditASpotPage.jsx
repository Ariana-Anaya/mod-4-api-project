import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetailsThunk } from "../../store/spots";
import { useSpotFormContext } from "../../context/SpotFormContext";
import SpotForm from "../SpotForm";


const EditASpotPage = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotToEdit = useSelector((state) => state.spots.currentSpotDetails); 
  const user = useSelector((state) => state.session.user); 
  const {
    setCountry,
    setAddress,
    setCity,
    setState,
    setDescription,
    setName,
    setPrice,
    setPreviewImageUrl,
    setSpotImageTwoUrl,
    setSpotImageThreeUrl,
    setSpotImageFourUrl,
    setSpotImageFiveUrl,
    setSpotToEdit,
    setUserErrors,
  } = useSpotFormContext();

  // ! Populate Form Fields
  useEffect(() => {
    setUserErrors({});
    dispatch(getSpotDetailsThunk(spotId)).then((currentSpot) => {
      const {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        SpotImages,
      } = currentSpot;

      setSpotToEdit(currentSpot);
      setCountry(country);
      setAddress(address);
      setCity(city);
      setState(state);
      setDescription(description);
      setName(name);
      setPrice(price);
      const previewImg = SpotImages.find((image) => image.preview);
      previewImg && setPreviewImageUrl(previewImg.url);

      const otherImages = SpotImages.filter((image) => !image.preview);
      if (otherImages.length > 0) {
        setSpotImageTwoUrl(otherImages[0].url);
      }
      if (otherImages.length > 1) {
        setSpotImageThreeUrl(otherImages[1].url);
      }
      if (otherImages.length > 2) {
        setSpotImageFourUrl(otherImages[2].url);
      }
      if (otherImages.length > 3) {
        setSpotImageFiveUrl(otherImages[3].url);
      }
    });
  }, [
    spotId,
    dispatch,
    setSpotToEdit,
    setCountry,
    setAddress,
    setCity,
    setState,
    setDescription,
    setName,
    setPrice,
    setPreviewImageUrl,
    setSpotImageTwoUrl,
    setSpotImageThreeUrl,
    setSpotImageFourUrl,
    setSpotImageFiveUrl,
    setUserErrors,
  ]); 

  if (
    Object.keys(spotToEdit).length === 0 ||
    spotToEdit.id !== Number(spotId) ||
    spotToEdit.ownerId !== user.id
  ) {
    return <h1>Cannot edit spot</h1>;
  }

  return (
    <section className="create-edit-spot-page">
      <h1 className="spot-form-main-heading page-header">Update Spot</h1>
      <SpotForm />
    </section>
  );
};

export default EditASpotPage;
