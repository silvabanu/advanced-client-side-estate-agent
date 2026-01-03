import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="hdr">
      <div className="hdr__inner">
        <div className="hdr__brand">
          <span className="hdr__logo" aria-hidden="true">🏡</span>
          <div>
            <div className="hdr__title">Estate Agent SPA</div>
            </div>
        </div>
        <nav className="hdr__nav" aria-label="Primary">
          <Link className={pathname.startsWith("/search") ? "hdr__link isActive" : "hdr__link"} to="/search">Search</Link>
        </nav>
      </div>
    </header>
  );
}
