import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchProductById } from "../store/productsSlice";
import { addToCartApi } from "../store/cartSlice";

import LoginModal from "../components/LoginModal";

function ProductDetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { selected, loading } = useSelector(
    (state) => state.products
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [showLoginModal, setShowLoginModal] =
    useState(false);
  const [pendingAddToCart, setPendingAddToCart] =
    useState(false);
  const [quantity, setQuantity] =
    useState(1);

  const [selectedColor, setSelectedColor] =
    useState("Black");

  const [selectedSize, setSelectedSize] =
    useState("M");

  const [selectedImage, setSelectedImage] =
    useState("");

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selected?.image_urls?.length) {
      setSelectedImage(selected.image_urls[0]);
    } else if (selected?.image_url) {
      setSelectedImage(selected.image_url);
    }
  }, [selected]);

  useEffect(() => {
    async function addPendingProduct() {
      if (
        user &&
        pendingAddToCart &&
        selected
      ) {
        try {
          await dispatch(
            addToCartApi({
              productId: selected.id,
              quantity,
            })
          ).unwrap();

          setPendingAddToCart(false);
        } catch (error) {
          console.error(error);
        }
      }
    }

    addPendingProduct();
  }, [
    user,
    pendingAddToCart,
    selected,
    quantity,
    dispatch,
  ]);


  if (loading || !selected) {
    return <p>Loading product...</p>;
  }

  const images =
    selected.image_urls?.length > 0
      ? selected.image_urls
      : selected.image_url
        ? [selected.image_url]
        : [];

  return (
    <main className="product-detail-page container">

      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back to products
      </button>

      {/* PRODUCT SECTION */}
      <section className="product-detail-layout">

        {/* LEFT SIDE */}
        <div className="product-gallery">

          {/* THUMBNAILS */}
          <div className="gallery-thumbs">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() =>
                  setSelectedImage(img)
                }
                className={
                  selectedImage === img
                    ? "active-thumb"
                    : ""
                }
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="gallery-main">
            <img
              src={selectedImage}
              alt={selected.name}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="product-info">

          <h1>{selected.name}</h1>

          {/* RATING */}
          <div className="product-rating">
            ★★★★★
            <span>4.8/5</span>
          </div>

          {/* PRICE */}
          <div className="product-price">

            ${Number(selected.price).toFixed(2)}

            <span className="old-price">
              $
              {(
                Number(selected.price) * 1.35
              ).toFixed(2)}
            </span>

            <span className="discount">
              -35%
            </span>

          </div>

          {/* DESCRIPTION */}
          <p className="product-description">
            {selected.description}
          </p>

          {/* COLOR FILTER */}
          <div className="detail-group">

            <h4>Select Color</h4>

            <div className="color-options">

              {[
                {
                  name: "Black",
                  code: "#222",
                },
                {
                  name: "White",
                  code: "#f5f5f5",
                },
                {
                  name: "Beige",
                  code: "#d4c4b0",
                },
                {
                  name: "Navy",
                  code: "#2c3e6b",
                },
              ].map((color) => (
                <span
                  key={color.name}
                  className={
                    selectedColor ===
                      color.name
                      ? "color active"
                      : "color"
                  }
                  style={{
                    background: color.code,
                  }}
                  onClick={() =>
                    setSelectedColor(
                      color.name
                    )
                  }
                />
              ))}

            </div>

            <p className="selected-text">
              Selected: {selectedColor}
            </p>

          </div>

          {/* SIZE FILTER */}
          <div className="detail-group">

            <h4>Select Size</h4>

            <div className="style-options">

              {[
                "XS",
                "S",
                "M",
                "L",
                "XL",
              ].map((size) => (
                <button
                  key={size}
                  className={
                    selectedSize === size
                      ? "active-style"
                      : ""
                  }
                  onClick={() =>
                    setSelectedSize(size)
                  }
                >
                  {size}
                </button>
              ))}

            </div>

          </div>

          {/* QUANTITY + CART */}
          <div className="product-actions">

            <div className="qty-box">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1
                      ? prev - 1
                      : 1
                  )
                }
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(
                    (prev) => prev + 1
                  )
                }
              >
                +
              </button>

            </div>

            <button
              type="button"
              className="add-cart-btn"
              onClick={async () => {
                if (!user) {
                  setPendingAddToCart(true);
                  setShowLoginModal(true);
                  return;
                }

                try {
                  await dispatch(
                    addToCartApi({
                      productId: selected.id,
                      quantity,
                    })
                  ).unwrap();
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Add to Cart
            </button>

          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="reviews-section">

        <div className="reviews-header">

          <h2>
            Customer Reviews & Ratings
          </h2>

          <button className="btn">
            Write Review
          </button>

        </div>

        <div className="reviews-grid">

          <div className="review-card">
            <div className="review-stars">
              ★★★★★
            </div>

            <h4>Samantha B.</h4>

            <p>
              Amazing fabric quality.
              Looks elegant and premium.
            </p>
          </div>

          <div className="review-card">
            <div className="review-stars">
              ★★★★★
            </div>

            <h4>Alex M.</h4>

            <p>
              Delivery was fast and the fit
              was absolutely perfect.
            </p>
          </div>

          <div className="review-card">
            <div className="review-stars">
              ★★★★☆
            </div>

            <h4>Olivia P.</h4>

            <p>
              Comfortable and trendy design.
              Worth every penny.
            </p>
          </div>

          <div className="review-card">
            <div className="review-stars">
              ★★★★★
            </div>

            <h4>Liam K.</h4>

            <p>
              Excellent stitching and
              beautiful finish.
            </p>
          </div>

        </div>
      </section>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() =>
          setShowLoginModal(false)
        }
      />

    </main>
  );
}

export default ProductDetailPage;