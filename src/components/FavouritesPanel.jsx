import React from "react";
import { Link } from "react-router-dom";
import { useFavourites } from "../state/favourites";
import "./FavouritesPanel.css";

export default function FavouritesPanel({ propertiesById, onDropRemove, onDropAdd }) {
  const fav = useFavourites();

  function allowDrop(e) {
    e.preventDefault();
  }

  return (
    <aside className="fav" aria-label="Favourites">
      <div
        className="fav__drop fav__drop--add"
        onDragOver={allowDrop}
        onDrop={(e) => onDropAdd?.(e)}
        title="Drop a property card here to add"
      >
        <div className="fav__title">Favourites</div>
        <div className="fav__hint">Drag cards here or press ☆</div>
      </div>

      <ul className="fav__list">
        {fav.favourites.length === 0 && <li className="fav__empty">No favourites yet.</li>}
        {fav.favourites.map((id) => {
          const p = propertiesById[id];
          if (!p) return null;
          return (
            <li key={id} className="fav__item">
              <img className="fav__thumb" src={`/${p.picture}`} alt="" />
              <div className="fav__meta">
                <Link className="fav__link" to={`/property/${id}`}>{p.type} • {p.bedrooms} bed</Link>
                <div className="fav__small">£{Number(p.price).toLocaleString()}</div>
              </div>
              <button className="fav__del" onClick={() => fav.remove(id)} aria-label={`Remove ${id}`} type="button">✕</button>
            </li>
          );
        })}
      </ul>

      <div
        className="fav__drop fav__drop--remove"
        onDragOver={allowDrop}
        onDrop={(e) => onDropRemove?.(e)}
        title="Drop a favourite here to remove"
      >
        <div className="fav__trash">🗑️ Drop here to remove</div>
      </div>

      <button className="btn btn--danger fav__clear" onClick={fav.clear} disabled={fav.favourites.length === 0} type="button">
        Clear favourites
      </button>
    </aside>
  );
}
