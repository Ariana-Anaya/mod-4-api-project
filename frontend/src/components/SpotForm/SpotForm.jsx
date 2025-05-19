import { useSpotFormContext } from "../../context/SpotFormContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addImageToSpotThunk,
  deleteSpotImageThunk,
  createNewSpotThunk,
  editASpotThunk,
} from "../../store/spots";

import FormField from "../FormField";
import ErrorText from "../ErrorText";
import "./SpotForm.css";

export const SpotForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    spotToEdit,
    country,
    setCountry,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
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
  } = useSpotFormContext();

  // required fields errors
  const requiredFields = {
    country: country,
    address: address,
    city: city,
    state: state,
    name: name,
    price: price,
    previewImageUrl: previewImageUrl,
  };

  // any image state in one iterable
  const spotImages = [
    previewImageUrl,
    spotImageTwoUrl,
    spotImageThreeUrl,
    spotImageFourUrl,
    spotImageFiveUrl,
  ];

  // ! Handle any client side errors before submitting
  const handleErrors = () => {
    const errors = {};

    Object.keys(requiredFields).forEach((requiredField) => {
      if (requiredFields[requiredField].length === 0) {
        let fieldName = requiredField[0].toUpperCase() + requiredField.slice(1);
        if (fieldName.startsWith("PreviewImage")) {
          fieldName = "Preview Image URL";
        }
        if (fieldName === "Price") {
          fieldName = "Price per night";
        }
        errors[requiredField] = `${fieldName} is required`;
      }
    });

    // description length minimum error
    if (description.length < 30) {
      errors["description"] = "Description needs 30 or more characters";
    }

    // name length maximum error
    if (name.length >= 50) {
      errors["name"] = "Name must be less than 50 characters";
    }

    // price must be non negative number error
    let priceAsNum = Number(price);
    if (isNaN(priceAsNum) || priceAsNum < 0) {
      errors["price"] = "Price per night must be a positive number";
    }

    const incorrectFileExtension = "Image URL must end in .png, .jpg, or .jpeg";
    spotImages.forEach((spotImage, index) => {
      if (
        !spotImage.endsWith(".png") &&
        !spotImage.endsWith(".jpg") &&
        !spotImage.endsWith(".jpeg")
      ) {
        if (index === 0 && spotImage.length > 0) {
          errors["previewImageUrl"] = incorrectFileExtension;
        } else if (spotImage.length > 0) {
          errors[`spotImage${index + 1}Url`] = incorrectFileExtension;
        }
      }
    });

    return errors;
  };

  // functions for creating and editing a spot
  const createASpot = async (spotDetails) => {
    const newSpot = await dispatch(createNewSpotThunk(spotDetails));
    return newSpot;
  };

  const deleteImagesAndEditSpot = async (spot, newSpotDetails) => {
    const imagesToDelete = spot.SpotImages;
    const imagePromises = imagesToDelete.map((spotImage) => {
      return dispatch(deleteSpotImageThunk(spotToEdit.id, spotImage));
    });
    const editedSpot = Promise.all(imagePromises)
      .then(() => {
        return editASpot(spot, newSpotDetails);
      })
      .catch(() => {
        // even if an image wasn't found when attempting to delete it, we still want to go ahead and update the spot
        return editASpot(spot, newSpotDetails);
      });

    return editedSpot;
  };

  const editASpot = async (spot, newSpotDetails) => {
    const editedSpot = await dispatch(editASpotThunk(spot.id, newSpotDetails));

    return editedSpot;
  };

  // ! Submitting the Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = handleErrors(); // this only checks for client side errors
    setUserErrors(errors); // if client side errors were fixed, this'll be an empty object, and will replace what was there from either client or server (remember all server side errors are being placed into the same keys as client side errors)
    if (Object.keys(errors).length > 0) {
      return;
    }

    const spotDetails = {
      country,
      address,
      city,
      state,
      lat: 27.234897234,
      lng: -73.3834583,
      description,
      name,
      price: Number(price),
    };

    let spot;

    if (spotToEdit) {
      spot = await deleteImagesAndEditSpot(spotToEdit, spotDetails);
    } else {
      spot = await createASpot(spotDetails);
    }

    if (spot.message || spot.errors) {
      spot.message && setUserErrors({ serverError: spot.message });
      spot.errors && setUserErrors(spot.errors);
      return;
    }

    // ! Upload images to the spot
    const imagesToAddToSpot = spotImages.filter(
      (spotImageUrl) => spotImageUrl.length > 0
    );

    const imagePromises = imagesToAddToSpot.map((spotImageUrl, index) => {
      const spotImageObj = { url: spotImageUrl };
      if (index === 0) {
        spotImageObj.preview = true; // only the first image should have preview: true
      }

      return dispatch(addImageToSpotThunk(spot.id, spotImageObj));
    });

    // don't navigate until all images are added because thunks can run out of order and if we navigate to the SpotDetails page, our getSpotDetails thunk might run before the images are added to the new or edited spot.
    Promise.all(imagePromises).then(() => {
      navigate(`/spots/${spot.id}`); // this navigate won't cause a refresh
    });
  };

  return (
    <form className="spot-form col" onSubmit={handleSubmit}>
      {userErrors.serverError && <ErrorText text={userErrors.serverError} />}
      <section className="spot-form-section-1">
        <div className="spot-form-section-introduction">
          <h2 className="spot-form-heading">
            Where&apos;s your place located?
          </h2>
          <p className="spot-form-section-caption spot-form-section-1-caption">
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>
        <div>
          <FormField
            labelText="Country"
            inputType="text"
            inputVal={country}
            setInputVal={setCountry}
            inputId="country-input"
            errorText={userErrors.country}
            errorIsInline
          />
          <FormField
            labelText="Street Address"
            inputType="text"
            inputVal={address}
            setInputVal={setAddress}
            inputId="address-input"
            errorText={userErrors.address}
            errorIsInline
          />
          <div className="flex-container split-input-row">
            <div className="form-field-half-row">
              <FormField
                labelText="City"
                inputType="text"
                inputVal={city}
                setInputVal={setCity}
                inputId="city-input"
                errorText={userErrors.city}
                errorIsInline
              />
            </div>
            <span style={{ alignSelf: "flex-end" }}>,</span>
            <div className="form-field-half-row">
              <FormField
                labelText="State"
                inputType="text"
                inputVal={state}
                setInputVal={setState}
                inputId="state-input"
                errorText={userErrors.state}
                errorIsInline
              />
            </div>
          </div>
        </div>
      </section>

      <section className="spot-form-section-2">
        <div className="spot-form-section-introduction">
          <h2 className="spot-form-heading">Describe your place to guests</h2>
          <p className="spot-form-section-caption">
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
        </div>
        <FormField
          inputType="textarea"
          inputVal={description}
          setInputVal={setDescription}
          inputId="description-input"
          errorText={userErrors.description}
          labelText="Please write at least 30 characters"
        />
      </section>
      <section className="spot-form-section-3">
        <div className="spot-form-section-introduction">
          <h2 className="spot-form-heading">Create a title for your spot</h2>
          <p className="spot-form-section-caption">
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
        </div>

        <FormField
          labelText="Name of your spot"
          inputType="text"
          inputVal={name}
          setInputVal={setName}
          inputId="name-input"
          placeholderText="Name of your spot"
          errorText={userErrors.name}
        />
      </section>

      <section className="spot-form-section-4">
        <div className="spot-form-section-introduction">
          <h2 className="spot-form-heading">Set a base price for your spot</h2>
          <p className="spot-form-section-caption">
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
        </div>
        <FormField
          labelText="Price per night (USD)"
          inputType="number"
          inputVal={price}
          setInputVal={setPrice}
          inputId="price-input"
          placeholderText="Price per night (USD)"
          errorText={userErrors.price}
        />
      </section>
      <section className="spot-form-section-5">
        <div className="spot-form-section-introduction">
          <h2 className="spot-form-heading">Liven up your spot with photos</h2>
          <p className="spot-form-section-caption">
            Submit a link to at least one photo to publish your spot.
          </p>
        </div>
        <FormField
          labelText="Preview Image URL"
          inputType="text"
          inputVal={previewImageUrl}
          setInputVal={setPreviewImageUrl}
          inputId="preview-img-input"
          placeholderText="Preview Image URL"
          errorText={userErrors.previewImageUrl}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageTwoUrl}
          setInputVal={setSpotImageTwoUrl}
          inputId="spot-image-two-input"
          placeholderText="Image URL"
          errorText={userErrors.spotImage2Url}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageThreeUrl}
          setInputVal={setSpotImageThreeUrl}
          inputId="spot-image-three-input"
          placeholderText="Image URL"
          errorText={userErrors.spotImage3Url}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageFourUrl}
          setInputVal={setSpotImageFourUrl}
          inputId="spot-image-four-input"
          placeholderText="Image URL"
          errorText={userErrors.spotImage4Url}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageFiveUrl}
          setInputVal={setSpotImageFiveUrl}
          inputId="spot-image-five-input"
          placeholderText="Image URL"
          errorText={userErrors.spotImage5Url}
        />
      </section>
      <button type="submit" className="small-button active-button">
        {`${spotToEdit ? "Update your" : "Create"} Spot`}
      </button>
    </form>
  );
};

export default SpotForm;
