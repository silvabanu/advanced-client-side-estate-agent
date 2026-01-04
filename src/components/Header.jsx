// Router tools
import { Link, useLocation } from "react-router-dom"; 

// Icon
import { Home } from "lucide-react"; 

// Styles
import "./Header.css"; 

// Header component
export default function Header() {

  // Current route path
  const { pathname } = useLocation();

  return (
    <header className="hdr">

      {/* Header inner layout */}
      <div className="hdr__inner">

        {/* Brand section */}
        <div className="hdr__brand">

          {/* Logo icon */}
          <Home
            className="hdr__logo"
            aria-hidden="true"
          />

          {/* App title */}
          <div>
            <div className="hdr__title">
              Estate Agent
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hdr__nav" aria-label="Primary">

          {/* Search link */}
          <Link
            className={
              pathname.startsWith("/search")
                ? "hdr__link isActive"
                : "hdr__link"
            }
            to="/search"
          >
            Search
          </Link>

        </nav>
      </div>
    </header>
  );
}