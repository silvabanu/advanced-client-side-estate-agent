// Form controls
import Select from "react-select";
import DatePicker from "react-datepicker";
import Slider from "rc-slider";

// Icon
import { Circle } from "lucide-react"; 

// Styles
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";
import "./SearchForm.css";

// Property type options
const TYPE_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "house", label: "House" },
  { value: "flat", label: "Flat" }
];

// Search form component
export default function SearchForm({
  postcodeAreas,
  criteria,
  onChange,
  onSearch,
  onReset
}) {

  // Postcode dropdown options
  const postcodeOptions = [
    { value: "", label: "Any" },
    ...postcodeAreas.map((a) => ({ value: a, label: a }))
  ];

  // Range limits
  const priceMin = 0;
  const priceMax = 1500000;
  const bedMin = 0;
  const bedMax = 6;

  // Update search criteria
  function set(patch) {
    onChange({ ...criteria, ...patch });
  }

  return (
    <form
      className="sf"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.();
      }}
    >

      {/* Form fields */}
      <div className="sf__grid">

        {/* Property type */}
        <div className="sf__field">
          <label className="sf__label">Property type</label>
          <Select
            classNamePrefix="rs"
            value={TYPE_OPTIONS.find((x) => x.value === criteria.type) || TYPE_OPTIONS[0]}
            onChange={(opt) => set({ type: opt?.value || "any" })}
            options={TYPE_OPTIONS}
            isSearchable={false}
          />
        </div>

        {/* Postcode area */}
        <div className="sf__field">
          <label className="sf__label">Postcode area</label>
          <Select
            classNamePrefix="rs"
            value={postcodeOptions.find((x) => x.value === criteria.postcodeArea) || postcodeOptions[0]}
            onChange={(opt) => set({ postcodeArea: opt?.value || "" })}
            options={postcodeOptions}
            isSearchable
          />
        </div>

        {/* Price range */}
        <div className="sf__field sf__field--wide">
          <label className="sf__label">Price range (£)</label>
          <div className="sf__range">
            <div className="sf__rangeText">
              Min: <b>{criteria.minPrice ?? priceMin}</b> <Circle size={8} /> Max: <b>{criteria.maxPrice ?? priceMax}</b>
            </div>
            <Slider
              range
              min={priceMin}
              max={priceMax}
              step={5000}
              allowCross={false}
              value={[criteria.minPrice ?? priceMin, criteria.maxPrice ?? priceMax]}
              onChange={([min, max]) => set({ minPrice: min, maxPrice: max })}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="sf__field sf__field--wide">
          <label className="sf__label">Bedrooms</label>
          <div className="sf__range">
            <div className="sf__rangeText">
              Min: <b>{criteria.minBeds ?? bedMin}</b> <Circle size={8} /> Max: <b>{criteria.maxBeds ?? bedMax}</b>
            </div>
            <Slider
              range
              min={bedMin}
              max={bedMax}
              step={1}
              allowCross={false}
              value={[criteria.minBeds ?? bedMin, criteria.maxBeds ?? bedMax]}
              onChange={([min, max]) => set({ minBeds: min, maxBeds: max })}
            />
          </div>
        </div>

        {/* Date filter */}
        <div className="sf__field sf__field--wide">
          <label className="sf__label">Date added</label>

          <div className="sf__dateRow">
            <label className="sf__radio">
              <input
                type="radio"
                checked={criteria.dateMode === "any"}
                onChange={() => set({ dateMode: "any" })}
              />
              Any
            </label>

            <label className="sf__radio">
              <input
                type="radio"
                checked={criteria.dateMode === "after"}
                onChange={() => set({ dateMode: "after" })}
              />
              After
            </label>

            <label className="sf__radio">
              <input
                type="radio"
                checked={criteria.dateMode === "between"}
                onChange={() => set({ dateMode: "between" })}
              />
              Between
            </label>
          </div>

          {/* After date */}
          {criteria.dateMode === "after" && (
            <div className="sf__datePick">
              <DatePicker
                selected={criteria.dateAfter}
                onChange={(d) => set({ dateAfter: d })}
                dateFormat="dd/MM/yyyy"
                isClearable
              />
            </div>
          )}

          {/* Between dates */}
          {criteria.dateMode === "between" && (
            <div className="sf__dateBetween">
              <DatePicker
                selected={criteria.dateFrom}
                onChange={(d) => set({ dateFrom: d })}
                dateFormat="dd/MM/yyyy"
                isClearable
              />
              <DatePicker
                selected={criteria.dateTo}
                onChange={(d) => set({ dateTo: d })}
                dateFormat="dd/MM/yyyy"
                isClearable
              />
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="sf__actions">
        <button className="btn" type="submit">Search</button>
        <button className="btn btn--ghost" type="button" onClick={onReset}>
          Reset
        </button>
      </div>
    </form>
  );
}