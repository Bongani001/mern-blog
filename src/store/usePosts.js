import { create } from "zustand";
import {
  getLatestPosts,
  getMostViewedPosts,
  getPostsByCategory,
} from "../services/posts";

export const usePosts = create((set) => ({
  latestPosts: [],
  mostViewedPosts: [],
  postsByCategory: [],
  post: {},
  isLoading: true,
  fetchLatestPosts: async () => {
    // Get the latest posts from the database
    let data = await getLatestPosts(8);
    set({ latestPosts: data });
  },
  fetchMostViewedPosts: async () => {
    // Get the most viewed posts from the database
    let data = await getMostViewedPosts(10);
    set({ mostViewedPosts: data });
  },
  fetchPostsByCategory: async (categoryId, searchQuery, page) => {
    // set({ postsByCategory: [] });
    set({ isLoading: true });

    // Get posts by category (arguments=(category id,page number, number of posts to fetch))
    const data = await getPostsByCategory(categoryId, searchQuery, page, 10);

    set({ postsByCategory: data });
    set({ isLoading: false });
  },
}));

// initialise the latest posts by getting them from the database
getLatestPosts(10).then((data) =>
  usePosts.setState({ latestPosts: data, isLoading: false })
);

// initialise the most viewed posts by getting them from the database
getMostViewedPosts(10).then((data) =>
  usePosts.setState({ mostViewedPosts: data, isLoading: false })
);
