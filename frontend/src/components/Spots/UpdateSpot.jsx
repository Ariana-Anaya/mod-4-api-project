
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateSpotThunk, getSpotByIdThunk } from '../../store/spots';
import './UpdateSpot.css';

function UpdateSpot() {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const spot = useSelector((state) => state.spots.singleSpot); 

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
    price: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId))
      .then(() => setIsLoading(false));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot) {
      setFormData({
        name: spot.name,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        price: spot.price,
        description: spot.description,
      });
    }
  }, [spot]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.country) validationErrors.country = "Please provide your country.";
    if (!formData.address) validationErrors.address = "Street address is mandatory.";
    if (!formData.city) validationErrors.city = "City is essential.";
    if (!formData.state) validationErrors.state = "State cannot be left blank.";
    if (formData.description.length < 30) validationErrors.description = "Description must be at least 30 characters.";
    if (!formData.name) validationErrors.name = "A title is necessary.";
    if (!formData.price) validationErrors.price = "Don't forget to set a price per night.";
    
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedSpot = {
      ...formData,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
    };

    const response = await dispatch(updateSpotThunk(spotId, updatedSpot));

    if (response && response.errors) {
      setErrors(response.errors);
      return;
    }

    navigate(`/spots/${spotId}`);
  };

  if (isLoading) {
    return <p>Loading your spot details...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="update-spot-form">
      <h2>Update your Spot</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="errorMessage">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        {errors.address && <p className="errorMessage">{errors.address}</p>}
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        {errors.city && <p className="errorMessage">{errors.city}</p>}
      </div>
      <div>
        <label htmlFor="state">State</label>
        <input
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
        {errors.state && <p className="errorMessage">{errors.state}</p>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        {errors.country && <p className="errorMessage">{errors.country}</p>}
      </div>
      <div>
        <label htmlFor="lat">Latitude</label>
        <input
          id="lat"
          name="lat"
          value={formData.lat}
          onChange={handleChange}
          required
        />
        {errors.lat && <p className="errorMessage">{errors.lat}</p>}
      </div>
      <div>
        <label htmlFor="lng">Longitude</label>
        <input
          id="lng"
          name="lng"
          value={formData.lng}
          onChange={handleChange}
          required
        />
        {errors.lng && <p className="errorMessage">{errors.lng}</p>}
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        {errors.price && <p className="errorMessage">{errors.price}</p>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {errors.description && <p className="errorMessage">{errors.description}</p>}
      </div>
      <button type="submit">Update your Spot</button>
    </form>
  );
}

export default UpdateSpot;
