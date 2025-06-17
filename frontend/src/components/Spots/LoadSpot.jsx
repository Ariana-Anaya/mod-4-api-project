import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotByIdThunk } from '../../store/spots'; 
import { useParams } from 'react-router-dom';
import './LoadSpot.css';
import Reviews from '../Reviews/Reviews' ;
import  { getSpotReviewsThunk } from '../../store/review';
export function LoadSpot() {
   const { spotId } = useParams();
   const dispatch = useDispatch();
   const reviews = useSelector((state) => state.reviews.spotReviews);
   const reviewArray = Object.values(reviews)


    const [allStar, setAvgStar] = useState(0);
   useEffect(() => {
       dispatch(getSpotByIdThunk(spotId));
       dispatch (getSpotReviewsThunk(spotId))
   }, [dispatch, spotId]);
    useEffect (() => {
        if (reviewArray.length > 0) {
            const starValues = reviewArray .map(review => review.stars)
            const totalStar = starValues.reduce((sum,star) => sum+star,0)
            const avgStar = totalStar/starValues.length;
            setAvgStar(avgStar);
        }
        else setAvgStar (0)
    }, [reviewArray]
);

   const spot = useSelector((state) => state.spots.singleSpot);

   if (!spot || !spot.id) {
       return <h1>Spot Not Found</h1>;
   }


   return (
       <div className="spots-detail-container">
         <div className="image-gallery">
                <div className="large-image">
                    <img src={'/preview1.jpeg'} alt="Spot" />
                </div>
                <div className="small-images">
                    <img src={'/detail1.jpeg'} alt="Spot" />
                    <img src={'/detail2.jpeg'} alt="Spot" />
                    <img src={'/detail3.jpeg'} alt="Spot" />
                    <img src={'/detail4.jpeg'} alt="Spot" />
                </div>
            </div>
        

       <div className="spot-details"> 
           <div className="spot-info">
               <h1>{spot.name}</h1>
               <h2>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
               <p>{spot.city}, {spot.state}</p>
               <p>{spot.description}</p>


    
           </div>


          

           <div className="calloutBox" data-testid='spot-callout-box'>
               <div className="reviewAndCount">
                   <span className="rating">★ {allStar > 0 ? allStar.toFixed(1): "New"} · {reviewArray.length > 1 ? "reivews": "review"}</span>
                   <span>
                   </span>
               </div>
               <p data-testid='spot-price'>${spot.price} / night</p>
               <button data-testid='reserve-button' onClick={() => alert("Feature coming soon")}>Reserve</button>
           </div>
        </div> 


        


<Reviews 
        spotId={spot.id} 
        avgRating={spot.avgRating} 
        numReviews={spot.numReviews} 
        RefechReviewChange={() => dispatch(getSpotReviewsThunk(spotId))}
        />



        
       </div>
   );
}
export default LoadSpot;
