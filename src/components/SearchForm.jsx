import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Slider from "rc-slider";
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";
import "./SearchForm.css";

const TYPE_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "house", label: "House" },
  { value: "flat", label: "Flat" }
];

export default function SearchForm({
  postcodeAreas,
  criteria,
  onChange,
  onSearch,
  onReset
}) {
  const postcodeOptions = [{ value: "", label: "Any" }, ...postcodeAreas.map((a) => ({ value: a, label: a }))];

  const priceMin = 0;
  const priceMax = 1500000;
  const bedMin = 0;
  const bedMax = 6;

  function set(patch) {
    onChange({ ...criteria, ...patch });
  }

  return (
    <form className="sf" onSubmit={(e) => { e.preventDefault(); onSearch?.(); }}>
      <div className="sf__grid">
        <div className="sf__field">
          <label className="sf__label">Property type</label>
          <Select
            classNamePrefix="rs"
            value={TYPE_OPTIONS.find((x) => x.value === criteria.type) || TYPE_OPTIONS[0]}
            onChange={(opt) => set({ type: opt?.value || "any" })}
            options={TYPE_OPTIONS}
            isSearchable={false}
            aria-label="Property type"
          />
        </div>

        <div className="sf__field">
          <label className="sf__label">Postcode area</label>
          <Select
            classNamePrefix="rs"
            value={postcodeOptions.find((x) => x.value === criteria.postcodeArea) || postcodeOptions[0]}
            onChange={(opt) => set({ postcodeArea: opt?.value || "" })}
            options={postcodeOptions}
            isSearchable
            aria-label="Postcode area"
            placeholder="Any"
          />
        </div>

        <div className="sf__field sf__field--wide">
          <label className="sf__label">Price range (£)</label>
          <div className="sf__range">
            <div className="sf__rangeText">
              Min: <b>{criteria.minPrice ?? priceMin}</b> • Max: <b>{criteria.maxPrice ?? priceMax}</b>
            </div>
            <Slider
              range
              min={priceMin}
              max={priceMax}
              step={5000}
              allowCross={false}
              value={[criteria.minPrice ?? priceMin, criteria.maxPrice ?? priceMax]}
              onChange={([min, max]) => set({ minPrice: min, maxPrice: max })}
              aria-label="Price range"
            />
          </div>
        </div>

        <div className="sf__field sf__field--wide">
          <label className="sf__label">Bedrooms</label>
          <div className="sf__range">
            <div className="sf__rangeText">
              Min: <b>{criteria.minBeds ?? bedMin}</b> • Max: <b>{criteria.maxBeds ?? bedMax}</b>
            </div>
            <Slider
              range
              min={bedMin}
              max={bedMax}
              step={1}
              allowCross={false}
              value={[criteria.minBeds ?? bedMin, criteria.maxBeds ?? bedMax]}
              onChange={([min, max]) => set({ minBeds: min, maxBeds: max })}
              aria-label="Bedroom range"
            />
          </div>
        </div>

        <div className="sf__field sf__field--wide">
          <label className="sf__label">Date added</label>
          <div className="sf__dateRow">
            <label className="sf__radio">
              <input
                type="radio"
                name="dateMode"
                checked={criteria.dateMode === "any"}
                onChange={() => set({ dateMode: "any" })}
              />
              Any
            </label>
            <label className="sf__radio">
              <input
                type="radio"
                name="dateMode"
                checked={criteria.dateMode === "after"}
                onChange={() => set({ dateMode: "after" })}
              />
              After
            </label>
            <label className="sf__radio">
              <input
                type="radio"
                name="dateMode"
                checked={criteria.dateMode === "between"}
                onChange={() => set({ dateMode: "between" })}
              />
              Between
            </label>
          </div>

          {criteria.dateMode === "after" && (
            <div className="sf__datePick">
              <DatePicker
                selected={criteria.dateAfter}
                onChange={(d) => set({ dateAfter: d })}
                placeholderText="Pick a date"
                dateFormat="dd/MM/yyyy"
                isClearable
              />
            </div>
          )}

          {criteria.dateMode === "between" && (
            <div className="sf__dateBetween">
              <DatePicker
                selected={criteria.dateFrom}
                onChange={(d) => set({ dateFrom: d })}
                placeholderText="From"
                dateFormat="dd/MM/yyyy"
                isClearable
              />
              <DatePicker
                selected={criteria.dateTo}
                onChange={(d) => set({ dateTo: d })}
                placeholderText="To"
                dateFormat="dd/MM/yyyy"
                isClearable
              />
            </div>
          )}
        </div>
      </div>

      <div className="sf__actions">
        <button className="btn" type="submit">Search</button>
        <button className="btn btn--ghost" type="button" onClick={onReset}>Reset</button>
      </div>
    </form>
  );
}
