import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";
import { getSpotsThunk } from "../../store/spots";
import './CreateSpot.css';

function CreateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState(""); 
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [images, setImages] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      setErrors({});
      setCountry("");
      setAddress("");
      setCity("");
      setState("");
      setDescription("");
      setName(""); 
      setPrice("");
      setPreviewImage("");
      setImages(["", "", "", ""]);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!country) newErrors.country = "Country is required.";
    if (!address) newErrors.address = "Street address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (description.length < 30) newErrors.description = "Description needs 30 or more characters.";
    if (!name) newErrors.name = "Name is required."; 
    if (!price) newErrors.price = "Price per night is required.";
    if (!previewImage) newErrors.previewImage = "Preview image is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const spotData = {
      country,
      address,
      city,
      state,
      description,
      name, 
      price,
      previewImage,
      images: images.filter(image => image) 
    };

    const createdSpot = await dispatch(createSpotThunk(spotData));
    if (createdSpot && createdSpot.id) {
      await dispatch(getSpotsThunk()); 
      navigate(`/spots/${createdSpot.id}`); 
    }
  };

  return (
    <div className="create-spot-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Create a New Spot</h1>

        <section>
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <label>
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            {errors.country && <p className="error">{errors.country}</p>}
          </label>

          <label>
            Street Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street Address"
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </label>

          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </label>

          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </label>

        </section>

        <section>
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </section>

        <section>
          <h2>Create a title for your spot</h2>
          <p>Catch guest&apos;s attention with a spot title that highlights what makes your place special.</p>
          <input
            type="text"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
          />
          {errors.name && <p className="error">{errors.name}</p>} {/* Updated to `name` */}
        </section>

        <section>
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </section>

        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder="Preview Image URL"
          />
          {errors.previewImage && <p className="error">{errors.previewImage}</p>}

          {images.map((image, idx) => (
            <input
              key={idx}
              type="text"
              value={image}
              onChange={(e) => {
                const newImages = [...images];
                newImages[idx] = e.target.value;
                setImages(newImages);
              }}
              placeholder={`Image URL ${idx + 1}`}
            />
          ))}
        </section>

        <button type="submit">Create Spot</button>

        {Object.keys(errors).length > 0 && (
          <div className="form-errors">
            {Object.values(errors).map((error, idx) => (
              <p key={idx} className="error">
                {error}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateSpot;
