import create from 'zustand';

const FAVORITES_KEY = 'favorites';

function getInitialFavorites() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

export const useGameStore = create((set, get) => ({
  search: '',
  setSearch: (search) => set({ search }),
  vendors: [],
  setVendors: (vendors) => set({ vendors }),
  favorites: getInitialFavorites(),
  toggleFavorite: (slug) => set((state) => {
    const isFav = state.favorites.includes(slug);
    const newFavs = isFav
      ? state.favorites.filter(f => f !== slug)
      : [...state.favorites, slug];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
    return { favorites: newFavs };
  }),
  isFavorite: (slug) => get().favorites.includes(slug),
  showFavoritesOnly: false,
  setShowFavoritesOnly: (val) => set({ showFavoritesOnly: val }),
})); 