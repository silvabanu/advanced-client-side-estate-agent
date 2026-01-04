// React hooks
import { useEffect, useState } from "react";

// Router components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages and layout
import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import Header from "./components/Header";

// Local storage key
const STORAGE_KEY = "ea_favourites_v1";

// App root component
export default function App() {

  // Favourites state (loaded from localStorage)
  const [favourites, setFavourites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Save favourites to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // Add favourite
  function addFavourite(id) {
    setFavourites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  // Remove favourite
  function removeFavourite(id) {
    setFavourites((prev) => prev.filter((item) => item !== id));
  }

  // Clear favourites
  function clearFavourites() {
    setFavourites([]);
  }

  // Check favourite
  function hasFavourite(id) {
    return favourites.includes(id);
  }

  // Favourites API
  const favouritesApi = {
    favourites,
    add: addFavourite,
    remove: removeFavourite,
    clear: clearFavourites,
    has: hasFavourite
  };

  return (
    <BrowserRouter>

      {/* App header */}
      <Header />

      {/* App routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<SearchPage favourites={favouritesApi} />} />
        <Route path="/property/:id" element={<PropertyPage favourites={favouritesApi} />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>

    </BrowserRouter>
  );
}