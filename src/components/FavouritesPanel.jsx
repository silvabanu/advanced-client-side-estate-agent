import { Link } from "react-router-dom";
import { Star, Trash2, X, Circle } from "lucide-react"; // added Circle
import "./FavouritesPanel.css";

const NO_FAVOURITES = {
  favourites: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false
};

export default function FavouritesPanel({ favourites = NO_FAVOURITES, propertiesById, onDropRemove, onDropAdd }) {

  function allowDrop(e) {
    e.preventDefault();
  }

  return (
    <aside className="fav" aria-label="Favourites">
      {/* Drop area to add */}
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

      {/* List of favourites */}
      <ul className="fav__list">
        {favourites.favourites.length === 0 && <li className="fav__empty">No favourites yet.</li>}
        {favourites.favourites.map((id) => {
          const p = propertiesById[id];
          if (!p) return null;

          return (
            <li key={id} className="fav__item">
              <img className="fav__thumb" src={`/${p.picture}`} alt="" />
              <div className="fav__meta">
                <Link className="fav__link" to={`/property/${id}`}>
                  {p.type} <Circle size={8} /> {p.bedrooms} bed
                </Link>
                <div className="fav__small">£{Number(p.price).toLocaleString()}</div>
              </div>
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

      {/* Drop area to remove */}
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

      {/* Clear button */}
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