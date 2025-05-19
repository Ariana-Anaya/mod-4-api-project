import "./ErrorText.css";

const ErrorText = ({ text, inlineError, errorBelowLine }) => {
  let errorClass = "error-text";
  if (inlineError) {
    errorClass += " inline-error";
  }
  if (errorBelowLine) {
    errorClass += " below-line-error";
  }

  return <span className={errorClass}> {text}</span>;
};

export default ErrorText;
