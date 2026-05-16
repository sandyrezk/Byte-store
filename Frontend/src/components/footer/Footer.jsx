import { Link } from 'react-router-dom'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .bs-footer {
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 60px 0 0;
    color: rgba(255,255,255,0.5);
  }

  .bs-footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px;
    padding-bottom: 48px;
  }

  /* Brand Column */
  .bs-footer-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.3rem;
    color: #fff;
    text-decoration: none;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .bs-footer-logo span { color: #6C63FF; }

  .bs-footer-logo-dot {
    width: 7px;
    height: 7px;
    background: #6C63FF;
    border-radius: 50%;
    display: inline-block;
  }

  .bs-footer-desc {
    font-size: 0.875rem;
    line-height: 1.7;
    color: rgba(255,255,255,0.35);
    margin-bottom: 24px;
    max-width: 260px;
  }

  /* Social Icons */
  .bs-footer-socials {
    display: flex;
    gap: 10px;
  }

  .bs-social-btn {
    width: 36px;
    height: 36px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    font-size: 0.85rem;
    transition: all 0.2s;
  }

  .bs-social-btn:hover {
    background: rgba(108,99,255,0.15);
    border-color: rgba(108,99,255,0.3);
    color: #a89fff;
    transform: translateY(-2px);
  }

  /* Links Columns */
  .bs-footer-col-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin-bottom: 20px;
  }

  .bs-footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .bs-footer-links a {
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .bs-footer-links a:hover {
    color: #fff;
    transform: translateX(3px);
  }

  /* Bottom Bar */
  .bs-footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .bs-footer-copy {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.25);
  }

  .bs-footer-copy span {
    color: #6C63FF;
  }

  .bs-footer-badges {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .bs-footer-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.2);
  }

  .bs-footer-badge i {
    color: rgba(108,99,255,0.5);
    font-size: 0.7rem;
  }

  @media (max-width: 768px) {
    .bs-footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .bs-footer-brand {
      grid-column: 1 / -1;
    }

    .bs-footer-bottom {
      flex-direction: column;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .bs-footer-grid {
      grid-template-columns: 1fr;
    }
  }
`

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <style>{styles}</style>
      <footer className="bs-footer">
        <div className="container">
          <div className="bs-footer-grid">

            {/* Brand */}
            <div className="bs-footer-brand">
              <Link to="/" className="bs-footer-logo">
                <span className="bs-footer-logo-dot"></span>
                Byte<span>Store</span>
              </Link>
              <p className="bs-footer-desc">
                Your go-to destination for laptops and mobile phones. Quality tech, fast delivery, unbeatable prices.
              </p>
              <div className="bs-footer-socials">
                <a href="#" className="bs-social-btn" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bs-social-btn" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bs-social-btn" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bs-social-btn" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <div className="bs-footer-col-title">Shop</div>
              <ul className="bs-footer-links">
                <li><Link to="/">All Products</Link></li>
                <li><Link to="/category/laptops">Laptops</Link></li>
                <li><Link to="/category/mobiles">Mobile Phones</Link></li>
                <li><Link to="/cart">My Cart</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <div className="bs-footer-col-title">Account</div>
              <ul className="bs-footer-links">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/user/orders">My Orders</Link></li>
                <li><Link to="/checkout">Checkout</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <div className="bs-footer-col-title">Support</div>
              <ul className="bs-footer-links">
                <li><a href="mailto:support@bytestore.com">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Return Policy</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="bs-footer-bottom">
            <div className="bs-footer-copy">
              © {currentYear} <span>ByteStore</span>. All rights reserved.
            </div>
            <div className="bs-footer-badges">
              <div className="bs-footer-badge">
                <i className="fas fa-shield-alt"></i> SSL Secured
              </div>
              <div className="bs-footer-badge">
                <i className="fab fa-stripe"></i> Stripe Payments
              </div>
              <div className="bs-footer-badge">
                <i className="fas fa-truck"></i> Fast Delivery
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer