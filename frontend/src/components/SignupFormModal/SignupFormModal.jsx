import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import FormField from "../FormField";
import ErrorText from "../ErrorText";

const SignupFormModal = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userErrors, setUserErrors] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState();
  const { closeModal } = useModal();

  useEffect(() => {
    let disabled;
    if (
      email.length === 0 ||
      username.length < 4 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      password.length < 6 ||
      confirmPassword !== password
    ) {
      disabled = true;
    } else {
      disabled = false;
    }
    setSubmitDisabled(disabled);
  }, [email, username, firstName, lastName, password, confirmPassword]); // anytime these values changes, the useEffect hook should run

  const handleClientSideErrors = () => {
    const errors = {};

    const validEmailRe =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!validEmailRe.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (validEmailRe.test(username)) {
      errors.username = "Username cannot be an email address";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client side validation here
    const clientSideErrors = handleClientSideErrors();

    if (Object.values(clientSideErrors).length > 0) {
      setUserErrors(clientSideErrors);
      return;
    }

    const response = await dispatch(
      sessionActions.signupUserThunk({
        email,
        username,
        firstName,
        lastName,
        password,
      })
    );
    if (response.errors) {
      setUserErrors({ serverErrors: response.errors }); // errors are coming from the backend
      return;
    }
    closeModal(); // only close modal if there are no errors because of return on line 50
  };

  return (
    <div className="modal-container signup-modal">
      <h2>Sign Up</h2>
      <div className="server-errors-container col">
        {userErrors.serverErrors &&
          Object.values(userErrors.serverErrors).map((serverError, index) => {
            return <ErrorText errorBelowLine key={index} text={serverError} />;
          })}
      </div>

      <form
        className="form-container flex-container col"
        onSubmit={handleSubmit}
      >
        <FormField
          inputType="text"
          inputVal={firstName}
          setInputVal={setFirstName}
          labelText="First Name"
        />

        <FormField
          inputType="text"
          inputVal={lastName}
          setInputVal={setLastName}
          labelText="Last Name"
        />

        <FormField
          inputType="text"
          inputVal={email}
          setInputVal={setEmail}
          labelText="Email"
          errorText={userErrors.email}
        />

        <FormField
          inputType="text"
          inputVal={username}
          setInputVal={setUsername}
          labelText="Username"
          errorText={userErrors.username}
        />

        <FormField
          inputType="password"
          inputVal={password}
          setInputVal={setPassword}
          labelText="Password"
        />

        <FormField
          inputType="password"
          inputVal={confirmPassword}
          setInputVal={setConfirmPassword}
          labelText="Confirm Password"
        />

        <button
          className={`full-width-button ${
            !submitDisabled ? " active-button" : ""
          }`}
          disabled={submitDisabled}
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupFormModal;
