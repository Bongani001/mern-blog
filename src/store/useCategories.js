import { create } from "zustand";
import { getAllCategories } from "../services/categories";

export const useCategories = create((set) => ({
  categories: [],
  selectedCategory: "",
  fetchCategories: async () => {
    // Get categories from the database
    const categories = await getAllCategories();
    set({ categories });
  },
  changeSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
}));

// Initialise the categories by getting them from the database
getAllCategories().then((data) => useCategories.setState({ categories: data }));
