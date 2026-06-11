import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchCart,
  removeFromCartApi,
  updateCartQuantityApi,
} from "../store/cartSlice";

function CartPage() {
  const dispatch = useDispatch();

  const { items = [], loading } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  /* CALCULATIONS */
  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const discount = subtotal * 0.2;

  const deliveryFee =
    items.length > 0 ? 15 : 0;

  const total =
    subtotal - discount + deliveryFee;

  return (
    <main className="cart-page container">
      <h1 className="cart-title">YOUR CART</h1>

      <div className="cart-layout">

        {/* LEFT SIDE */}
        <section className="cart-items-section">

          {loading ? (
            <p>Loading cart...</p>
          ) : !items.length ? (
            <div className="empty-cart">
              <h3>Your cart is empty</h3>

              <Link
                to="/products"
                className="btn"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product_id}
                className="modern-cart-item"
              >
                {/* IMAGE */}
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="cart-product-img"
                />

                {/* INFO */}
                <div className="cart-product-info">

                  <div className="cart-top-row">
                    <div>
                      <h3>{item.name}</h3>

                      <p>
                        Size:
                        <span> Large</span>
                      </p>

                      <p>
                        Color:
                        <span> Brown</span>
                      </p>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        dispatch(
                          removeFromCartApi(
                            item.product_id
                          )
                        )
                      }
                    >
                      ✕
                    </button>
                  </div>

                  <div className="cart-bottom-row">

                    <h2>
                      $
                      {Number(item.price).toFixed(
                        0
                      )}
                    </h2>

                    {/* QUANTITY CONTROLS */}
                    <div className="qty-controller">

                      {/* MINUS */}
                      <button
                        disabled={
                          item.quantity <= 1
                        }
                        onClick={() =>
                          dispatch(
                            updateCartQuantityApi({
                              productId:
                                item.product_id,
                              quantity:
                                item.quantity - 1,
                            })
                          )
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      {/* PLUS */}
                      <button
                        onClick={() =>
                          dispatch(
                            updateCartQuantityApi({
                              productId:
                                item.product_id,
                              quantity:
                                item.quantity + 1,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* RIGHT SIDE */}
        <aside className="order-summary-box">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>
              ${subtotal.toFixed(0)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Discount (-20%)</span>
            <strong className="discount-text">
              -${discount.toFixed(0)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <strong>${deliveryFee}</strong>
          </div>

          <div className="summary-divider" />

          <div className="summary-row total-row">
            <span>Total</span>
            <strong>${total.toFixed(0)}</strong>
          </div>

          {/* PROMO */}
          <div className="promo-box">
            <input
              type="text"
              placeholder="Add promo code"
            />
            <button>Apply</button>
          </div>

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Go to Checkout →
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default CartPage;