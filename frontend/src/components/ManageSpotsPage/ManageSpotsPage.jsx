import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpotsByUserThunk } from "../../store/spots";
import SpotTile from "../SpotTile";
import SpotOwnerOptions from "../SpotOwnerOptions";
import "./ManageSpots.css";

const ManageSpotsPage = () => {
  const allSpotsByUser = useSelector((state) => state.spots.spotsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsByUserThunk());
  }, [dispatch]);

  return (
    <section className="manage-spots-page col">
      <div className="intro-section flex-container col">
        <h1 className="page-header">Manage Spots</h1>
      </div>

      {allSpotsByUser.length > 0 ? (
        <div className="grid-container manage-spots-page spots-container">
          {allSpotsByUser.map((spot) => {
            return (
              <div key={spot.id} className="manage-spot-tile">
                <SpotTile spotId={spot.id} />
                <SpotOwnerOptions spotId={spot.id} />
              </div>
            );
          })}
        </div>
      ) : (
        <button className="no-spots-yet-button full-width-button active-button">
          <Link to="/spots/new">Create a New Spot</Link>
        </button>
      )}
    </section>
  );
};

export default ManageSpotsPage;
