// React hooks for state and side effects
import { useEffect, useState } from "react";

// Close (X) icon
import { X } from "lucide-react";

// Component styles
import "./ImageGallery.css";

/* ----------------------------------
   Image Gallery Component
----------------------------------- */
export default function ImageGallery({ propertyId }) {

  /* Create an array of image paths based on propertyId
     Example: /images/12pic1.jpg, /images/12pic2.jpg, etc. */
  const images = Array.from(
    { length: 8 },
    (_, i) => `/images/${propertyId}pic${i + 1}.jpg`
  );

  // First image is used as default
  const firstImage = images[0];

  // Currently selected (active) image
  const [active, setActive] = useState(firstImage);

  // Controls whether the lightbox is open or closed
  const [isOpen, setIsOpen] = useState(false);

  /* Reset active image when propertyId changes
     (for example, when viewing a new property) */
  useEffect(() => {
    setActive(firstImage);
  }, [firstImage]);

  return (
    <div className="gal">

      {/* ============================= */}
      {/* Main image (click to open) */}
      {/* ============================= */}
      <button
        className="gal__main"
        type="button"
        onClick={() => setIsOpen(true)}  /* Open lightbox */
        aria-label="Open image viewer"
      >
        <img src={active} alt="Property large view" />
        <span className="gal__zoom">View all</span>
      </button>

      {/* ============================= */}
      {/* Thumbnail images */}
      {/* ============================= */}
      <div
        className="gal__thumbs"
        role="list"
        aria-label="Thumbnails"
      >
        {images.map((src) => (
          <button
            key={src}
            className={
              src === active
                ? "gal__thumb isActive"  /* Highlight active image */
                : "gal__thumb"
            }
            type="button"
            onClick={() => setActive(src)} /* Change main image */
          >
            <img src={src} alt="Property thumbnail" />
          </button>
        ))}
      </div>

      {/* ============================= */}
      {/* Lightbox (full image view) */}
      {/* ============================= */}
      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >

          {/* Close button */}
          <button
            className="lightbox__close"
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Grid of all images */}
          <div className="lightbox__grid">
            {images.map((src) => (
              <button
                key={src}
                className="lightbox__item"
                type="button"
                onClick={() => {
                  setActive(src);     /* Set selected image */
                  setIsOpen(false);   /* Close lightbox */
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