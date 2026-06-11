import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login, register } from "../store/authSlice";

function LoginModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const { loading, error, token } = useSelector(
    (state) => state.auth
  );

  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function onSubmit(e) {
    e.preventDefault();

    if (isRegister) {
      dispatch(register(formData));
    } else {
      dispatch(
        login({
          email: formData.email,
          password: formData.password,
        })
      );
    }
  }

  // close modal after login success
  useEffect(() => {
    if (token && isOpen) {
      onClose();
    }
  }, [token, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <h2>
          {isRegister ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={onSubmit}>
          {isRegister && (
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <button
            className="btn"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>

          {error && (
            <p className="error">{error}</p>
          )}
        </form>

        <button
          className="link-btn"
          onClick={() =>
            setIsRegister((prev) => !prev)
          }
        >
          {isRegister
            ? "Already have an account? Login"
            : "New here? Register"}
        </button>
      </div>
    </div>
  );
}

export default LoginModal;