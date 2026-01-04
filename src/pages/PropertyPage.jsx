// React and router tools
import React from "react";
import { Link, useParams } from "react-router-dom";

// Icons
import { Star, Circle } from "lucide-react";

// Data and components
import propertiesData from "../data/properties.json";
import ImageGallery from "../components/ImageGallery";
import Tabs from "../components/Tabs";

// Utilities and styles
import { sanitizeText } from "../utils/sanitize";
import "./PropertyPage.css";

// Default favourites object
const NO_FAVOURITES = {
  favourites: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false
};

// Property page component
export default function PropertyPage({ favourites = NO_FAVOURITES }) {

  // Get property ID from URL
  const { id } = useParams();

  // Find property data
  const property = propertiesData.properties.find((p) => p.id === id);

  // Show error if property not found
  if (!property) {
    return (
      <main className="page">
        <div className="property_page__inner">
          <section className="panel">
            <h1 className="h1">Property not found</h1>
            <Link className="btn" to="/search">Back to search</Link>
          </section>
        </div>
      </main>
    );
  }

  // Favourite state
  const isFav = favourites.has(property.id);

  // Map search query
  const mapQuery = encodeURIComponent(property.location);

  // Base URL for assets
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "/"
      : "/advanced-client-side-estate-agent/";

  // Tab content data
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
          <img
            src={`${BASE_URL}images/${property.id}floorplan.jpg`}
            alt="Floor plan"
          />
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
      <div className="property_page__inner">
        <section className="panel">

          {/* Property header */}
          <div className="propHead">
            <div>
              <Link className="link" to="/search">← Back to search</Link>
              <h1 className="h1">
                {property.type} <Circle size={10} /> {property.bedrooms} bed
              </h1>

              <div className="propMeta">
                <span className="price">
                  £{Number(property.price).toLocaleString()}
                </span>
                <Circle size={6} className="dot" />
                <span className="loc">{property.location}</span>
              </div>
            </div>

            {/* Favourite button */}
            <button
              className={isFav ? "btn isFav" : "btn"}
              onClick={() =>
                isFav
                  ? favourites.remove(property.id)
                  : favourites.add(property.id)
              }
              type="button"
              aria-pressed={isFav}
            >
              <Star
                size={16}
                fill={isFav ? "currentColor" : "none"}
                stroke="currentColor"
                style={{ marginRight: 4 }}
              />
              {isFav ? "In favourites" : "Add to favourites"}
            </button>
          </div>

          {/* Image gallery */}
          <ImageGallery propertyId={property.id} />

          {/* Property tabs */}
          <Tabs tabs={tabs} />

        </section>
      </div>
    </main>
  );
}