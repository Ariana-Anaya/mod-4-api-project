import { useDispatch } from "react-redux";
import { useSpotFormContext } from "../../context/SpotFormContext";
import { useEffect } from "react";
import SpotForm from "../SpotForm";

const CreateASpotPage = () => {
  const dispatch = useDispatch();
  const {
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
  } = useSpotFormContext();

  // ! Reset Form Fields in case we're coming from EditASpotPage
  useEffect(() => {
    setSpotToEdit(undefined);
    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setDescription("");
    setName("");
    setPrice("");
    setPreviewImageUrl("");
    setSpotImageTwoUrl("");
    setSpotImageThreeUrl("");
    setSpotImageFourUrl("");
    setSpotImageFiveUrl("");
    setUserErrors({});
  }, [
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

  return (
    <section className="create-edit-spot-page">
      <h1 className="spot-form-main-heading page-header">Create a New Spot</h1>
      <SpotForm />
    </section>
  );
};

export default CreateASpotPage;
