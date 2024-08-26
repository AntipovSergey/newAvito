import { create } from "zustand";

const useStore = create((set) => ({
  items: [],
  seeAllItems: (items) => set(() => ({ items: items })),
  addNewItem: (newItem) =>
    set((state) => ({ items: [...state.items, newItem] })),
}));

export default useStore;
