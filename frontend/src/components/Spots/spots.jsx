import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsThunk } from '../../store/spots';
import { getSpotReviewsThunk } from '../../store/review';
import { useNavigate } from 'react-router-dom';
import './spots.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-free-solid';
const Spots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getSpotsThunk()).then(() => setIsLoading(false));
  }, [dispatch]);

  const handleSpotClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="spotList">
      {Object.values(spots)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))   
        .map((spot) => (
        <SpotTile key={spot.id} spot={spot} onClick={handleSpotClick} />
      ))}
    </div>
  );
};

const SpotTile = ({ spot, onClick }) => {
  const dispatch = useDispatch();
  const [avgStar, setAvgStar] = useState(0);
  const reviews = useSelector((state) => state.reviews[spot.id] || []); 

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spot.id));
  }, [dispatch, spot.id]);

  useEffect(() => {
    if (reviews.length > 0) {
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    const avgRating = totalStars / reviews.length;
    setAvgStar(avgRating);
     } else {
       setAvgStar(0); 
     }
  }, [reviews]);

  
  return (
    <div className="eachSpot" title={spot.name} onClick={() => onClick(spot.id)}>
      <img className="spot-thumbnail" src={spot.previewImage || '/preview1.jpeg'} alt={spot.name} />
      <div className="spot-info">
        <p className="spot-location">{spot.city}, {spot.state}</p>
        <div className="spot-name" title={spot.name}>{spot.name}</div>
        <div className="spot-rating">
          {avgStar > 0 ? (
               
            <div>
              <FontAwesomeIcon icon={faStar} color='black' /> {avgStar.toFixed(1)}
            </div>
          ) : (
            <span>New</span>
          )}
        </div>
        <p className="spot-price">${spot.price} <span className="night-label">night</span></p>
      </div>
    </div>
  );
};

export default Spots;
