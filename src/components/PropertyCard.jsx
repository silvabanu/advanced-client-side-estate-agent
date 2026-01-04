// Router link
import { Link } from "react-router-dom";

// Icons
import { Star } from "lucide-react";

// Text sanitizer
import { sanitizeText } from "../utils/sanitize";

// Styles
import "./PropertyCard.css";

// Default favourites object
const NO_FAVOURITES = {
  favourites: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false
};

// Property card component
export default function PropertyCard({
  property,
  onDragStart,
  favourites = NO_FAVOURITES
}) {

  // Check favourite state
  const isFav = favourites.has(property.id);

  // Base URL for images
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "/"
      : "/advanced-client-side-estate-agent/";

  return (
    <article
      className="card"
      draggable
      onDragStart={(e) => onDragStart?.(e, property.id)}
      aria-label={`Property ${property.id}`}
    >

      {/* Property image */}
      <img
        className="card__img"
        src={`${BASE_URL}${property.picture}`}
        alt={`${property.type} preview`}
      />

      {/* Card content */}
      <div className="card__body">

        {/* Title and price */}
        <div className="card__top">
          <h3 className="card__title">
            {property.type} <Star size={12} /> {property.bedrooms} bed
          </h3>
          <div className="card__price">
            £{Number(property.price).toLocaleString()}
          </div>
        </div>

        {/* Location */}
        <div className="card__loc">
          {property.location}
        </div>

        {/* Description */}
        <p className="card__desc">
          {sanitizeText(property.description).slice(0, 140)}
          {sanitizeText(property.description).length > 140 ? "…" : ""}
        </p>

        {/* Action buttons */}
        <div className="card__actions">
          <Link className="btn" to={`/property/${property.id}`}>
            View details
          </Link>

          <button
            className={isFav ? "btn btn--ghost isFav" : "btn btn--ghost"}
            onClick={() =>
              isFav
                ? favourites.remove(property.id)
                : favourites.add(property.id)
            }
            aria-pressed={isFav}
            type="button"
          >
            <Star
              size={16}
              fill={isFav ? "currentColor" : "none"}
              stroke="currentColor"
            />
            {isFav ? " Favourited" : " Favourite"}
          </button>
        </div>

      </div>
    </article>
  );
}