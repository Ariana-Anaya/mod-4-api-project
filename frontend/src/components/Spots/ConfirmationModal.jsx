import "./ManageSpots.css";
const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="confirmation-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this spot</p>
      <button className="delete-spot-button" onClick={onConfirm}>Yes (Delete Spot)</button>
      <button className="keep-spot-button" onClick={onClose}>No (Keep Spot)</button>
    </div>
  );
};

export default ConfirmationModal;
