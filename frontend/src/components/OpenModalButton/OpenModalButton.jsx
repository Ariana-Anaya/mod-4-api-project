import { useModal } from "../../context/Modal";

const OpenModalButton = ({
  elementName, 
  modalComponent, 
  controllerText, 
  onButtonClick, 
  onModalClose, 
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
