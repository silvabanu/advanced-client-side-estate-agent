// React hook
import { useState } from "react";

// Data and components
import propertiesData from "../data/properties.json";
import SearchForm from "../components/SearchForm";
import PropertyCard from "../components/PropertyCard";
import FavouritesPanel from "../components/FavouritesPanel";

// Utils and styles
import { filterProperties, extractPostcodeAreas } from "../utils/filterProperties";
import "./SearchPage.css";

// Default search criteria
const DEFAULT_CRITERIA = {
  type: "any",
  postcodeArea: "",
  minPrice: 0,
  maxPrice: 1500000,
  minBeds: 0,
  maxBeds: 6,
  dateMode: "any",
  dateAfter: null,
  dateFrom: null,
  dateTo: null
};

// Default favourites object
const NO_FAVOURITES = {
  favourites: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false
};

// Search page component
export default function SearchPage({ favourites = NO_FAVOURITES }) {

  // All properties
  const all = propertiesData.properties;

  // Search state
  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);
  const [submittedCriteria, setSubmittedCriteria] = useState(DEFAULT_CRITERIA);

  // Derived data
  const postcodeAreas = extractPostcodeAreas(all);
  const results = filterProperties(all, submittedCriteria);

  // Map properties by ID
  const propertiesById = {};
  all.forEach((p) => {
    propertiesById[p.id] = p;
  });

  // Submit search
  function onSearch() {
    setSubmittedCriteria(criteria);
  }

  // Reset search
  function onReset() {
    setCriteria(DEFAULT_CRITERIA);
    setSubmittedCriteria(DEFAULT_CRITERIA);
  }

  // Start drag action
  function onDragStart(e, id) {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "copy";
  }

  // Drop to add favourite
  function onDropAdd(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) favourites.add(id);
  }

  // Drop to remove favourite
  function onDropRemove(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) favourites.remove(id);
  }

  return (
    <main className="page">
      <div className="page__inner">

        {/* Search form */}
        <section className="panel panel--form">
          <h1 className="h1">Search properties</h1>
          <p className="muted">
            Use any combination of criteria: type, price, bedrooms, date added, and postcode area.
          </p>
          <SearchForm
            postcodeAreas={postcodeAreas}
            criteria={criteria}
            onChange={setCriteria}
            onSearch={onSearch}
            onReset={onReset}
          />
        </section>

        {/* Search results */}
        <section className="panel panel--results" aria-label="Search results">
          <div className="results__head">
            <h2 className="h2">Results</h2>
            <div className="results__count">
              {results.length} found
            </div>
          </div>

          <div className="results__grid">
            {results.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onDragStart={onDragStart}
                favourites={favourites}
              />
            ))}
          </div>
        </section>

        {/* Favourites panel */}
        <FavouritesPanel
          favourites={favourites}
          propertiesById={propertiesById}
          onDropAdd={onDropAdd}
          onDropRemove={onDropRemove}
        />

      </div>
    </main>
  );
}