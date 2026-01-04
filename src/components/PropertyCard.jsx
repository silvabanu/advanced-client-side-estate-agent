import React from "react";
import { Link } from "react-router-dom";
import { sanitizeText } from "../utils/sanitize";
import "./PropertyCard.css";

const NO_FAVOURITES = {
  favourites: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false
};

export default function PropertyCard({ property, onDragStart, favourites = NO_FAVOURITES }) {
  const isFav = favourites.has(property.id);

  return (
    <article
      className="card"
      draggable
      onDragStart={(e) => onDragStart?.(e, property.id)}
      aria-label={`Property ${property.id}`}
    >
      <img className="card__img" src={`/${property.picture}`} alt={`${property.type} preview`} />
      <div className="card__body">
        <div className="card__top">
          <h3 className="card__title">{property.type} • {property.bedrooms} bed</h3>
          <div className="card__price">£{Number(property.price).toLocaleString()}</div>
        </div>
        <div className="card__loc">{property.location}</div>
        <p className="card__desc">{sanitizeText(property.description).slice(0, 140)}{sanitizeText(property.description).length > 140 ? "…" : ""}</p>

        <div className="card__actions">
          <Link className="btn" to={`/property/${property.id}`}>View details</Link>
          <button
            className={isFav ? "btn btn--ghost isFav" : "btn btn--ghost"}
            onClick={() => (isFav ? favourites.remove(property.id) : favourites.add(property.id))}
            aria-pressed={isFav}
            title={isFav ? "Remove from favourites" : "Add to favourites"}
            type="button"
          >
            {isFav ? "★ Favourited" : "☆ Favourite"}
          </button>
        </div>
      </div>
    </article>
  );
}
