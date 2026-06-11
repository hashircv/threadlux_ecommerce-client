import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../store/authSlice";
import { fetchCart } from "../store/cartSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

return (
  <header className="navbar">

    {/* LOGO */}
    <Link to="/" className="brand">
      ThreadLux
    </Link>

    {/* NAV LINKS */}
    <nav className="nav-links">
      <NavLink to="/">Home</NavLink>

      <NavLink to="/products">
        Collection
      </NavLink>

      <NavLink
        to="/cart"
        className="cart-link"
      >
        Cart

        {cartCount > 0 && (
          <span className="cart-badge">
            {cartCount}
          </span>
        )}
      </NavLink>

      <NavLink to="/orders">
        Orders
      </NavLink>

      {/* LOGIN INSIDE NAV */}
      {!user && (
        <Link
          to="/login"
          className="login-btn"
        >
          Sign In
        </Link>
      )}
    </nav>

    {/* USER ACCOUNT */}
    {user && (
      <div className="account-wrapper">
        <button
          className="account-btn"
          onClick={() => setOpen(!open)}
        >
          👤 {user.name || "Account"}
        </button>

        {open && (
          <div className="account-dropdown">
            <div className="account-info">
              <p className="account-name">
                {user.name}
              </p>

              <p className="account-email">
                {user.email}
              </p>
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    )}
  </header>
);
}

export default Navbar;
