import { useModal } from "../../context/Modal";
import { deleteASpotThunk, getSpotDetailsThunk } from "../../store/spots";
import { deleteAReviewThunk } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({
  confirmationMessage,
  subjectType,
  subjectId,
}) => {
  const dispatch = useDispatch();
  const currentSpot = useSelector((state) => state.spots.currentSpotDetails);
  const { closeModal } = useModal();
  const handleDelete = () => {
    // depending on the subject passed in, call one of two thunks
    dispatch(
      subjectType === "spot"
        ? deleteASpotThunk(subjectId)
        : deleteAReviewThunk(subjectId)
    ).then(() => {
      // dispatch the thunk to update the currentSpotDetails IF this is a review delete AND we're deleting it from a SpotDetailPage
      if (subjectType === "review" && currentSpot.id) {
        dispatch(getSpotDetailsThunk(currentSpot.id));
      }

      closeModal();
    });
  };

  const subjectTypeCapitalized = `${subjectType[0].toUpperCase()}${subjectType.slice(
    1
  )}`;

  return (
    <>
      <div className="deleteConfirmationContainer modal-container">
        <h2>Confirm Delete</h2>
        <p className="delete-confirmation-text">{`${confirmationMessage}`}</p>
        <div className="flex-container delete-modal-button-row">
          <button
            onClick={handleDelete}
            className="delete-modal-button small-button active-button"
          >
            {`Yes (Delete ${subjectTypeCapitalized})`}
          </button>
          <button
            onClick={closeModal}
            className="delete-modal-button small-button active-button dark-button"
          >
            {`No (Keep ${subjectTypeCapitalized})`}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
