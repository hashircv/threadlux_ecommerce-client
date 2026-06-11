import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const dispatch = useDispatch();

  const { items = [], loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 return (
  <main className="home">
    <div className="container">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <p className="hero-tag">
            New Season Collection
          </p>

          <h1>
            Find Fashion
            <br />
            <em>That Defines</em>
            <br />
            Your Style
          </h1>

          <p className="hero-description">
            Discover curated fashion crafted for
            the modern wardrobe with elegance,
            confidence, and timeless aesthetics.
          </p>

          <div className="hero-actions">
            <Link
              to="/products"
              className="btn"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="btn btn-outline"
            >
              Explore More
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h3>500+</h3>
              <p>Premium Styles</p>
            </div>

            <div>
              <h3>10,000+</h3>
              <p>Happy Customers</p>
            </div>

            <div>
              <h3>50,000+</h3>
              <p>Orders Delivered</p>
            </div>
          </div>
        </div>

      <div className="hero-right">
  <img
    className="hero-img"
    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop"
    alt="Fashion"
  />
</div>
      </section>

      {/* BRANDS */}
      <section className="brands">
        <h2>ZARA</h2>
        <h2>H&amp;M</h2>
        <h2>GUCCI</h2>
        <h2>MANGO</h2>
        <h2>UNIQLO</h2>
      </section>

      {/* PRODUCTS */}
      <section className="products-section">
        <div className="section-header">
          <h2>NEW ARRIVALS</h2>

          <Link
            to="/products"
            className="view-all"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="products-grid">
            {items
              .slice(0, 4)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
          </div>
        )}
      </section>

      {/* TOP SELLING */}
<section className="products-section">
  <div className="section-header">
    <h2>TOP SELLING</h2>

    <Link
      to="/products"
      className="view-all"
    >
      View All
    </Link>
  </div>

  {loading ? (
    <p>Loading products...</p>
  ) : (
    <div className="products-grid">
      {items
        .slice(4, 8)
        .map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
    </div>
  )}
</section>

      {/* CATEGORY SECTION */}
      <section className="categories">
        <h2>BROWSE BY STYLE</h2>

        <div className="category-grid">
          <div className="category-card large">
            <img
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop"
              alt=""
            />
            <span>Women's Fashion</span>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop"
              alt=""
            />
            <span>Men's Fashion</span>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"
              alt=""
            />
            <span>Accessories</span>
          </div>

          <div className="category-card large">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop"
              alt=""
            />
            <span>Outerwear</span>
          </div>
        </div>
      </section>

{/* REVIEWS SECTION */}
<section className="reviews-section">
  <div className="section-header">
    <h2>WHAT OUR CUSTOMERS SAY</h2>
  </div>

  <div className="reviews-slider">

    <div className="reviews-track">

      <div className="review-card">
        <div className="stars">★★★★★</div>
        <h3>Sarah Johnson</h3>
        <p>
          Absolutely loved the quality of the
          fabrics. The dress fits perfectly
          and looks stunning.
        </p>
      </div>

      <div className="review-card">
        <div className="stars">★★★★★</div>
        <h3>Michael Brown</h3>
        <p>
          Trendy designs with premium quality.
          Everything looked exactly like the
          pictures online.
        </p>
      </div>

      <div className="review-card">
        <div className="stars">★★★★★</div>
        <h3>Emma Wilson</h3>
        <p>
          Great customer service and beautiful
          collections. Delivery was very fast.
        </p>
      </div>

      <div className="review-card">
        <div className="stars">★★★★★</div>
        <h3>Daniel Lee</h3>
        <p>
          The jacket exceeded my expectations.
          Excellent stitching and feel.
        </p>
      </div>

      <div className="review-card">
        <div className="stars">★★★★★</div>
        <h3>Olivia Taylor</h3>
        <p>
          Very stylish outfits and the
          website experience was smooth and
          easy to navigate.
        </p>
      </div>

      {/* DUPLICATES FOR SMOOTH LOOP */}

      <div className="review-card">
        <div className="stars">★★★★★</div>
        <h3>Sarah Johnson</h3>
        <p>
          Absolutely loved the quality of the
          fabrics. The dress fits perfectly
          and looks stunning.
        </p>
      </div>

      <div className="review-card">
        <div className="stars">★★★★★</div>
        <h3>Michael Brown</h3>
        <p>
          Trendy designs with premium quality.
          Everything looked exactly like the
          pictures online.
        </p>
      </div>

    </div>
  </div>
</section>

    </div>
  </main>
);
}

export default HomePage;
