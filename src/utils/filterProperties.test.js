import { filterProperties } from "./filterProperties";

const sample = [
  { id:"a", type:"House", bedrooms:3, price:500000, location:"X BR1", added:{month:"January", day:1, year:2024} },
  { id:"b", type:"Flat", bedrooms:1, price:250000, location:"Y NW1", added:{month:"March", day:10, year:2024} },
  { id:"c", type:"House", bedrooms:5, price:1200000, location:"Z BR6", added:{month:"December", day:31, year:2023} }
];

test("filters by type", () => {
  const out = filterProperties(sample, { type:"house" });
  expect(out.map((x) => x.id)).toEqual(["a","c"]);
});

test("filters by price range", () => {
  const out = filterProperties(sample, { minPrice: 200000, maxPrice: 600000 });
  expect(out.map((x) => x.id)).toEqual(["a","b"]);
});

test("filters by bedrooms range", () => {
  const out = filterProperties(sample, { minBeds: 2, maxBeds: 4 });
  expect(out.map((x) => x.id)).toEqual(["a"]);
});

test("filters by date after", () => {
  const out = filterProperties(sample, { dateMode:"after", dateAfter: new Date(2024, 1, 1) }); // after Feb 1 2024
  expect(out.map((x) => x.id)).toEqual(["b"]);
});

test("filters by postcode area", () => {
  const out = filterProperties(sample, { postcodeArea:"NW1" });
  expect(out.map((x) => x.id)).toEqual(["b"]);
});
