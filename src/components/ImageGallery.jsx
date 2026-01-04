import React, { useEffect, useState } from "react";
import "./ImageGallery.css";

export default function ImageGallery({ propertyId }) {
  const images = Array.from({ length: 8 }, (_, i) => `/images/${propertyId}pic${i + 1}.jpg`);
  const firstImage = images[0];
  const [active, setActive] = useState(firstImage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActive(firstImage);
  }, [firstImage]);

  return (
    <div className="gal">
      <button className="gal__main" type="button" onClick={() => setIsOpen(true)} aria-label="Open image viewer">
        <img src={active} alt="Property large view" />
        <span className="gal__zoom">View all</span>
      </button>

      <div className="gal__thumbs" role="list" aria-label="Thumbnails">
        {images.map((src) => (
          <button
            key={src}
            className={src === active ? "gal__thumb isActive" : "gal__thumb"}
            type="button"
            onClick={() => setActive(src)}
          >
            <img src={src} alt="Property thumbnail" />
          </button>
        ))}
      </div>

      {isOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button className="lightbox__close" type="button" onClick={() => setIsOpen(false)} aria-label="Close">✕</button>
          <div className="lightbox__grid">
            {images.map((src) => (
              <button key={src} className="lightbox__item" type="button" onClick={() => { setActive(src); setIsOpen(false); }}>
                <img src={src} alt="Property image" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
