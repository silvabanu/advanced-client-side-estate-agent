import { Link, useLocation } from "react-router-dom"; 
import { Home } from "lucide-react"; 
import "./Header.css"; 

export default function Header() {
  // Get the current URL path to highlight active link
  const { pathname } = useLocation();

  return (
    <header className="hdr">
      <div className="hdr__inner">
        {/* Brand section with logo and title */}
        <div className="hdr__brand">
          <Home className="hdr__logo" aria-hidden="true" /> {/* Lucide Home icon */}
          <div>
            <div className="hdr__title">Estate Agent</div> {/* App title */}
          </div>
        </div>

        {/* Navigation section */}
        <nav className="hdr__nav" aria-label="Primary">
          {/* Link to Search page. Adds 'isActive' class if current path starts with /search */}
          <Link
            className={pathname.startsWith("/search") ? "hdr__link isActive" : "hdr__link"}
            to="/search"
          >
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}