import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import Header from "./components/Header";

const STORAGE_KEY = "ea_favourites_v1";

export default function App() {
  const [favourites, setFavourites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  function addFavourite(id) {
    setFavourites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function removeFavourite(id) {
    setFavourites((prev) => prev.filter((item) => item !== id));
  }

  function clearFavourites() {
    setFavourites([]);
  }

  function hasFavourite(id) {
    return favourites.includes(id);
  }

  const favouritesApi = {
    favourites,
    add: addFavourite,
    remove: removeFavourite,
    clear: clearFavourites,
    has: hasFavourite
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<SearchPage favourites={favouritesApi} />} />
        <Route path="/property/:id" element={<PropertyPage favourites={favouritesApi} />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
