// React hooks
import { useEffect, useState } from "react";

// Close icon
import { X } from "lucide-react";

// Styles
import "./ImageGallery.css";

// Image gallery component
export default function ImageGallery({ propertyId }) {

  // Base URL for local and GitHub Pages
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "/"
      : "/advanced-client-side-estate-agent/";

  // Generate image paths
  const images = Array.from(
    { length: 8 },
    (_, i) => `${BASE_URL}images/${propertyId}pic${i + 1}.jpg`
  );

  // Default image
  const firstImage = images[0];

  // Active image state
  const [active, setActive] = useState(firstImage);

  // Lightbox open state
  const [isOpen, setIsOpen] = useState(false);

  // Reset image on property change
  useEffect(() => {
    setActive(firstImage);
  }, [firstImage]);

  return (
    <div className="gal">

      {/* Main image */}
      <button
        className="gal__main"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open image viewer"
      >
        <img src={active} alt="Property view" />
        <span className="gal__zoom">View all</span>
      </button>

      {/* Thumbnails */}
      <div className="gal__thumbs" role="list">
        {images.map((src) => (
          <button
            key={src}
            className={src === active ? "gal__thumb isActive" : "gal__thumb"}
            type="button"
            onClick={() => setActive(src)}
          >
            <img src={src} alt="Thumbnail" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div className="lightbox" role="dialog" aria-modal="true">

          {/* Close button */}
          <button
            className="lightbox__close"
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Image grid */}
          <div className="lightbox__grid">
            {images.map((src) => (
              <button
                key={src}
                className="lightbox__item"
                type="button"
                onClick={() => {
                  setActive(src);
                  setIsOpen(false);
                }}
              >
                <img src={src} alt="Property image" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}