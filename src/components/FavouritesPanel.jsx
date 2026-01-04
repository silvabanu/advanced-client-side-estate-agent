// React Router link for navigation
import { Link } from "react-router-dom";

// Icons from lucide-react
import { Star, Trash2, X, Circle } from "lucide-react";

// Component styles
import "./FavouritesPanel.css";

// Default empty favourites object (prevents crashes if props are missing)
const NO_FAVOURITES = {
  favourites: [],     // List of favourite IDs
  add: () => {},      // Add favourite (empty function)
  remove: () => {},   // Remove favourite
  clear: () => {},    // Clear all favourites
  has: () => false    // Check if favourite exists
};

// Main Favourites Panel component
export default function FavouritesPanel({
  favourites = NO_FAVOURITES,  // Favourite state & methods
  propertiesById,              // Property data mapped by ID
  onDropRemove,                // Drag & drop remove handler
  onDropAdd                    // Drag & drop add handler
}) {

  // Allows items to be dropped by preventing default behavior
  function allowDrop(e) {
    e.preventDefault();
  }

  return (
    <aside className="fav" aria-label="Favourites">
      
      {/* ================= Add favourites drop area ================= */}
      <div
        className="fav__drop fav__drop--add"
        onDragOver={allowDrop}
        onDrop={(e) => onDropAdd?.(e)}
        title="Drop a property card here to add"
      >
        <div className="fav__title">
          Favourites <Star size={20} />
        </div>

        <div className="fav__hint">
          Drag cards here or press <Star size={16} />
        </div>
      </div>

      {/* ================= Favourite items list ================= */}
      <ul className="fav__list">
        
        {/* Show message if there are no favourites */}
        {favourites.favourites.length === 0 && (
          <li className="fav__empty">No favourites yet.</li>
        )}

        {/* Render each favourite item */}
        {favourites.favourites.map((id) => {
          const p = propertiesById[id]; // Get property data by ID
          if (!p) return null;          // Skip if property not found

          return (
            <li key={id} className="fav__item">
              
              {/* Property thumbnail */}
              <img
                className="fav__thumb"
                src={`/${p.picture}`}
                alt=""
              />

              {/* Property details */}
              <div className="fav__meta">
                <Link className="fav__link" to={`/property/${id}`}>
                  {p.type} <Circle size={8} /> {p.bedrooms} bed
                </Link>

                <div className="fav__small">
                  £{Number(p.price).toLocaleString()}
                </div>
              </div>

              {/* Remove single favourite button */}
              <button
                className="fav__del"
                onClick={() => favourites.remove(id)}
                aria-label={`Remove ${id}`}
                type="button"
              >
                <X size={16} />
              </button>
            </li>
          );
        })}
      </ul>

      {/* ================= Remove favourites drop area ================= */}
      <div
        className="fav__drop fav__drop--remove"
        onDragOver={allowDrop}
        onDrop={(e) => onDropRemove?.(e)}
        title="Drop a favourite here to remove"
      >
        <div className="fav__trash">
          <Trash2 size={20} /> Drop here to remove
        </div>
      </div>

      {/* ================= Clear all favourites button ================= */}
      <button
        className="btn btn--danger fav__clear"
        onClick={favourites.clear}
        disabled={favourites.favourites.length === 0}
        type="button"
      >
        Clear favourites
      </button>

    </aside>
  );
}