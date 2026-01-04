import React from "react";
import { Link, useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import ImageGallery from "../components/ImageGallery";
import Tabs from "../components/Tabs";
import { sanitizeText } from "../utils/sanitize";
import "./PropertyPage.css";

const NO_FAVOURITES = {
  favourites: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false
};

export default function PropertyPage({ favourites = NO_FAVOURITES }) {
  const { id } = useParams();
  const property = propertiesData.properties.find((p) => p.id === id);

  if (!property) {
    return (
      <main className="page">
        <div className="page__inner">
          <section className="panel">
            <h1 className="h1">Property not found</h1>
            <Link className="btn" to="/search">Back to search</Link>
          </section>
        </div>
      </main>
    );
  }

  const isFav = favourites.has(property.id);
  const mapQuery = encodeURIComponent(property.location);

  const tabs = [
    {
      label: "Description",
      content: (
        <div className="tabText">
          <p>{sanitizeText(property.description)}</p>
          <ul className="facts">
            <li><b>Type:</b> {property.type}</li>
            <li><b>Bedrooms:</b> {property.bedrooms}</li>
            <li><b>Tenure:</b> {property.tenure}</li>
            <li><b>Added:</b> {property.added.day} {property.added.month} {property.added.year}</li>
          </ul>
        </div>
      )
    },
    {
      label: "Floor plan",
      content: (
        <div className="tabMedia">
          <img src={`/images/${property.id}floorplan.jpg`} alt="Floor plan" />
        </div>
      )
    },
    {
      label: "Map",
      content: (
        <div className="tabMedia">
          <iframe
            title="Google map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          />
        </div>
      )
    }
  ];

  return (
    <main className="page">
      <div className="page__inner">
        <section className="panel">
          <div className="propHead">
            <div>
              <Link className="link" to="/search">← Back to search</Link>
              <h1 className="h1">{property.type} • {property.bedrooms} bed</h1>
              <div className="propMeta">
                <span className="price">£{Number(property.price).toLocaleString()}</span>
                <span className="dot">•</span>
                <span className="loc">{property.location}</span>
              </div>
            </div>

            <button
              className={isFav ? "btn isFav" : "btn"}
              onClick={() => (isFav ? favourites.remove(property.id) : favourites.add(property.id))}
              type="button"
              aria-pressed={isFav}
            >
              {isFav ? "★ In favourites" : "☆ Add to favourites"}
            </button>
          </div>

          <ImageGallery propertyId={property.id} />

          <Tabs tabs={tabs} />
        </section>
      </div>
    </main>
  );
}
