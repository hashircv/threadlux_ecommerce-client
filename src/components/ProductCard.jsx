import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { addToCartApi } from "../store/cartSlice";
import LoginModal from "./LoginModal";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const { token } = useSelector(
    (state) => state.auth
  );

  const [showLoginModal, setShowLoginModal] =
    useState(false);

  const handleAddToCart = () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    dispatch(
      addToCartApi({
        productId: product.id,
        quantity: 1,
      })
    );
  };

  return (
    <>
      <article className="card">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image_url}
            alt={product.name}
          />
        </Link>

        <div className="card-body">
          <h3>{product.name}</h3>

          <p className="card-price">
            ${Number(product.price).toFixed(2)}
          </p>

          <div className="card-rating">
            ★★★★★ <span>(4.8)</span>
          </div>

          <div className="card-actions">
            <Link
              className="btn btn-outline"
              to={`/products/${product.id}`}
            >
              Details
            </Link>

            <button
              className="btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </article>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() =>
          setShowLoginModal(false)
        }
      />
    </>
  );
}

export default ProductCard;