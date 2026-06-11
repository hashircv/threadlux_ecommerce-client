import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";

function ProductListingPage() {
  const dispatch = useDispatch();

  const { items = [], loading } = useSelector(
    (state) => state.products
  );

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] =
    useState("default");

  const [showFilters, setShowFilters] =
    useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = [
    "All",
    ...new Set(
      items.map((product) => product.category)
    ),
  ];

  const filteredProducts = useMemo(() => {
    let products =
      selectedCategory === "All"
        ? [...items]
        : items.filter(
            (product) =>
              product.category ===
              selectedCategory
          );

    /* SEARCH */
    products = products.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    /* SORT */
    if (sortBy === "low") {
      products.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "high") {
      products.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortBy === "az") {
      products.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return products;
  }, [
    items,
    selectedCategory,
    search,
    sortBy,
  ]);

  return (
    <main className="products-page container">

      {/* MOBILE FILTER BUTTON */}
      <button
        className="mobile-filter-btn"
        onClick={() => setShowFilters(true)}
      >
        <HiOutlineMenuAlt3 size={22} />
        Filters
      </button>

      <div className="products-layout">

        {/* SIDEBAR */}
        <aside
          className={
            showFilters
              ? "filters-sidebar active"
              : "filters-sidebar"
          }
        >

          <div className="filters-header">
            <h3>Filters</h3>

            <div className="filter-actions">

              <button
                className="clear-btn"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearch("");
                  setSortBy("default");
                }}
              >
                Clear
              </button>

              <button
                className="close-filters"
                onClick={() =>
                  setShowFilters(false)
                }
              >
                ✕
              </button>

            </div>
          </div>

          {/* CATEGORY */}
          <div className="filter-group">
            <h4>Category</h4>

            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory ===
                    category
                      ? "category-btn active"
                      : "category-btn"
                  }
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FABRIC */}
          <div className="filter-group">
            <h4>Fabric</h4>

            <label className="check-item">
              <input type="checkbox" />
              Cotton
            </label>

            <label className="check-item">
              <input type="checkbox" />
              Linen
            </label>

            <label className="check-item">
              <input type="checkbox" />
              Silk
            </label>

            <label className="check-item">
              <input type="checkbox" />
              Denim
            </label>
          </div>

          {/* SIZE */}
          <div className="filter-group">
            <h4>Size</h4>

            <div className="size-list">
              <button>XS</button>
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
          </div>

          {/* BRAND */}
          <div className="filter-group">
            <h4>Brand</h4>

            <label className="check-item">
              <input type="checkbox" />
              Zara
            </label>

            <label className="check-item">
              <input type="checkbox" />
              H&amp;M
            </label>

            <label className="check-item">
              <input type="checkbox" />
              Mango
            </label>

            <label className="check-item">
              <input type="checkbox" />
              Uniqlo
            </label>
          </div>

          {/* PRICE */}
          <div className="filter-group">
            <h4>Price Range</h4>

            <input
              type="range"
              min="10"
              max="500"
              className="price-range"
            />

            <div className="price-values">
              <span>$10</span>
              <span>$500</span>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <section className="products-content">

          {/* TOPBAR */}
          <div className="products-topbar">

            <div>
              <h2>Fashion Collection</h2>

              <p>
                Showing{" "}
                {filteredProducts.length} products
              </p>
            </div>

            <div className="topbar-actions">

              {/* SEARCH */}
              <input
                type="text"
                placeholder="Search styles..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="search-input"
              />

              {/* SORT */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="sort-select"
              >
                <option value="default">
                  Sort By
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="az">
                  Name: A-Z
                </option>
              </select>
            </div>
          </div>

          {/* PRODUCTS */}
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>

              <p>
                Try changing filters or search.
              </p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ProductListingPage;
