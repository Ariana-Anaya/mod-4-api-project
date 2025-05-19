import ErrorText from "../ErrorText";

const FormField = ({
  labelText,
  inputType,
  inputVal,
  setInputVal,
  inputId,
  errorText,
  errorIsInline,
}) => {
  return (
    <div className="form-field flex-container col">
      {errorIsInline ? (
        <>
          <div className="flex-container label-error-row">
            <label htmlFor={inputId}>{labelText}</label>
            {errorText && <ErrorText inlineError text={errorText} />}
          </div>
          <input
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            placeholder={labelText}
            id={inputId}
            type={inputType}
          />
        </>
      ) : (
        <>
          <label
            htmlFor={inputId}
            className={`${
              inputId === "price-input" ? "price-input-container" : ""
            }`}
          >
            {inputType === "textarea" ? (
              <textarea
                rows="8"
                value={inputVal}
                id={inputId}
                placeholder={labelText}
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
              ></textarea>
            ) : (
              <>
                {inputId === "price-input" && (
                  <span className="dollar-sign">$</span>
                )}
                <input
                  value={inputVal}
                  onChange={(e) => {
                    if (
                      inputId === "price-input" &&
                      e.target.value.includes(".")
                    ) {
                      let priceAsNum = Number(
                        Number(e.target.value).toFixed(2)
                      );
                      e.target.value = priceAsNum;
                    }
                    setInputVal(e.target.value);
                  }}
                  placeholder={labelText}
                  type={inputType}
                  id={inputId}
                />
              </>
            )}
          </label>
          {errorText && <ErrorText errorBelowLine text={errorText} />}
        </>
      )}
    </div>
  );
};

export default FormField;
