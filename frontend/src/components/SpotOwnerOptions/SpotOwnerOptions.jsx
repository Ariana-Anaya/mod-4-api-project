import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import "./SpotOwnerOptions.css";

const SpotOwnerOptions = ({ spotId }) => {
  const navigate = useNavigate();
  const linkTo = `/spots/${spotId}/edit`;

  return (
    <div className="spot-owner-options flex-container">
      <button
        className="spot-owner-button small-button"
        onClick={() => {
          navigate(linkTo);
        }}
      >
        Update
      </button>

      <OpenModalButton
        elementName="button"
        customClasses="spot-owner-button small-button"
        modalComponent={
          <DeleteConfirmationModal
            subjectId={spotId}
            confirmationMessage="Are you sure you want to remove this spot?"
            subjectType="spot"
          />
        }
        controllerText="Delete"
      />
    </div>
  );
};

export default SpotOwnerOptions;
