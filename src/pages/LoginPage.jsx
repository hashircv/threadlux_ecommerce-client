import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // ✅ Handle login/register submit
  function onSubmit(e) {
    e.preventDefault();

    if (isRegister) {
      dispatch(register(formData));
    } else {
      dispatch(
        login({
          email: formData.email,
          password: formData.password
        })
      );
    }
  }

  // ✅ Redirect when login/register success
  useEffect(() => {
    if (token) {
      navigate("/"); // change to "/dashboard" if needed
    }
  }, [token, navigate]);

  return (
    <div className="auth-container">
      <section className="auth-box">
        <h2>{isRegister ? "Create Account" : "Login"}</h2>

        <form onSubmit={onSubmit}>
          {isRegister && (
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          )}

          <input
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="btn" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
          </button>

          {error && <h5 className="error">{error}</h5>}
        </form>

        <button
          className="link-btn"
          onClick={() => setIsRegister((v) => !v)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New here? Register"}
        </button>
      </section>
    </div>
  );
}

export default LoginPage;