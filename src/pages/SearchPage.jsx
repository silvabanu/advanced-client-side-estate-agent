import React, { useMemo, useState } from "react";
import propertiesData from "../data/properties.json";
import SearchForm from "../components/SearchForm";
import PropertyCard from "../components/PropertyCard";
import FavouritesPanel from "../components/FavouritesPanel";
import { filterProperties, extractPostcodeAreas } from "../utils/filterProperties";
import { useFavourites } from "../state/favourites";
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

export default function SearchPage() {
  const all = propertiesData.properties;
  const fav = useFavourites();

  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);
  const [submittedCriteria, setSubmittedCriteria] = useState(DEFAULT_CRITERIA);

  const postcodeAreas = useMemo(() => extractPostcodeAreas(all), [all]);

  const results = useMemo(() => filterProperties(all, submittedCriteria), [all, submittedCriteria]);

  const propertiesById = useMemo(() => {
    const map = {};
    all.forEach((p) => { map[p.id] = p; });
    return map;
  }, [all]);

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
    if (id) fav.add(id);
  }

  function onDropRemove(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) fav.remove(id);
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
              <PropertyCard key={p.id} property={p} onDragStart={onDragStart} />
            ))}
          </div>
        </section>

        <FavouritesPanel
          propertiesById={propertiesById}
          onDropAdd={onDropAdd}
          onDropRemove={onDropRemove}
        />
      </div>
    </main>
  );
}
