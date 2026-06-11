function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand */}
        <div className="footer-col">
          <h3 className="footer-brand">ThreadLux</h3>
          <p className="footer-text">
            Curated fashion for the modern wardrobe. Designed with elegance and confidence in mind.
          </p>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/products">Collection</a>
          <a href="/cart">Cart</a>
          <a href="/orders">Orders</a>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4>Categories</h4>
          <a href="#">Tops</a>
          <a href="#">Dresses</a>
          <a href="#">Outerwear</a>
          <a href="#">Accessories</a>
        </div>

        {/* Social */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="socials">
            <span>🌐</span>
            <span>📷</span>
            <span>🐦</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ThreadLux. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
