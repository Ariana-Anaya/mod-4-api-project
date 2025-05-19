import { useModal } from "../../context/Modal";

const OpenModalButton = ({
  elementName, // type of element to render
  modalComponent, // component to render inside the modal
  controllerText, // text of the modal operator that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  customClasses,
}) => {
  const { setModalContent, setOnModalClose } = useModal();
  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <>
      {elementName === "li" ? (
        <li className={customClasses} onClick={onClick}>
          {controllerText}
        </li>
      ) : elementName === "button" ? (
        <button className={customClasses} onClick={onClick}>
          {controllerText}
        </button>
      ) : null}
    </>
  );
};

export default OpenModalButton;
