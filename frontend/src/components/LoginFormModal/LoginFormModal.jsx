import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});


    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  const loginDemo = async (e) => {
    e.preventDefault();
      await dispatch(sessionActions.login({
        "credential": "Demo-lition",
        "password": "password"
      }));
      closeModal();
    }
  const disableLoginButton = credential.length < 4 || password.length < 6;


  return (
    <div className="login-modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className="error">{errors.credential}</p>
        )}
        <button 
          type="submit" 
          className="login-btn" 
          disabled={disableLoginButton}
        >
          Log In
        </button>
      </form>

      <button 
        onClick={loginDemo} 
        className="demo-btn"
      >
        Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;