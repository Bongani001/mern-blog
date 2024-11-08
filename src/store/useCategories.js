import { create } from "zustand";
import { getAllCategories } from "../services/categories";

export const useCategories = create((set) => ({
  categories: [],
  selectedCategory: "",
  fetchCategories: async () => {
    const categories = await getAllCategories();
    set({ categories });
  },
  changeSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
}));

getAllCategories().then((data) => useCategories.setState({ categories: data }));
