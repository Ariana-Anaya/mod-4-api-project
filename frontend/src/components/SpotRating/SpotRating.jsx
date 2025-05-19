import { FaStar } from "react-icons/fa6";
import "./SpotRating.css";

const SpotRating = ({ rating }) => {
  return (
    <>
      <div className="rating flex-container">
        <div className="icon-container">
          <FaStar />
        </div>
        <span>{rating ? rating.toFixed(1) : "New"}</span>
      </div>
    </>
  );
};

export default SpotRating;
