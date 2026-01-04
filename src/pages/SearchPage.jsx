import { useState } from "react";
import propertiesData from "../data/properties.json";
import SearchForm from "../components/SearchForm";
import PropertyCard from "../components/PropertyCard";
import FavouritesPanel from "../components/FavouritesPanel";
import { filterProperties, extractPostcodeAreas } from "../utils/filterProperties";
import "./SearchPage.css";

const DEFAULT_CRITERIA = {
  type: "any",
  postcodeArea: "",
  minPrice: 0,
  maxPrice: 1500000,
  minBeds: 0,
  maxBeds: 6,
  dateMode: "any", // any | after | between
  dateAfter: null,
  dateFrom: null,
  dateTo: null
};

const NO_FAVOURITES = {
  favourites: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false
};

export default function SearchPage({ favourites = NO_FAVOURITES }) {
  const all = propertiesData.properties;

  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);
  const [submittedCriteria, setSubmittedCriteria] = useState(DEFAULT_CRITERIA);

  const postcodeAreas = extractPostcodeAreas(all);
  const results = filterProperties(all, submittedCriteria);
  const propertiesById = {};
  all.forEach((p) => {
    propertiesById[p.id] = p;
  });

  function onSearch() {
    setSubmittedCriteria(criteria);
  }

  function onReset() {
    setCriteria(DEFAULT_CRITERIA);
    setSubmittedCriteria(DEFAULT_CRITERIA);
  }

  function onDragStart(e, id) {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "copy";
  }

  function onDropAdd(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) favourites.add(id);
  }

  function onDropRemove(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) favourites.remove(id);
  }

  return (
    <main className="page">
      <div className="page__inner">
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

        <section className="panel panel--results" aria-label="Search results">
          <div className="results__head">
            <h2 className="h2">Results</h2>
            <div className="results__count">{results.length} found</div>
          </div>

          <div className="results__grid">
            {results.map((p) => (
              <PropertyCard key={p.id} property={p} onDragStart={onDragStart} favourites={favourites} />
            ))}
          </div>
        </section>

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
