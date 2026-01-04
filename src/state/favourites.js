import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavouritesContext = createContext(null);

const STORAGE_KEY = "ea_favourites_v1";

export function FavouritesProvider({ children }) {
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

  const api = useMemo(() => {
    function add(id) {
      setFavourites((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
    function remove(id) {
      setFavourites((prev) => prev.filter((x) => x !== id));
    }
    function clear() {
      setFavourites([]);
    }
    function has(id) {
      return favourites.includes(id);
    }
    return { favourites, add, remove, clear, has };
  }, [favourites]);

  return <FavouritesContext.Provider value={api}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
}
