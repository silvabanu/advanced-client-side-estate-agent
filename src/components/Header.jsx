// Import Link for navigation and useLocation to detect current route
import { Link, useLocation } from "react-router-dom"; 

// Import Home icon from lucide-react
import { Home } from "lucide-react"; 

// Import header styles
import "./Header.css"; 

/* ----------------------------------
   Header Component
----------------------------------- */
export default function Header() {

  // Get the current URL path (used to highlight active menu link)
  const { pathname } = useLocation();

  return (
    <header className="hdr">

      {/* Inner container to center and align content */}
      <div className="hdr__inner">

        {/* ============================= */}
        {/* Brand section (logo + title) */}
        {/* ============================= */}
        <div className="hdr__brand">

          {/* Home icon used as logo */}
          <Home
            className="hdr__logo"
            aria-hidden="true"   /* Decorative icon (screen readers ignore it) */
          />

          {/* App name */}
          <div>
            <div className="hdr__title">
              Estate Agent
            </div>
          </div>
        </div>

        {/* ============================= */}
        {/* Navigation section */}
        {/* ============================= */}
        <nav className="hdr__nav" aria-label="Primary">

          {/* Search link
              - Adds 'isActive' class when URL starts with /search
              - Highlights the current page in the menu */}
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