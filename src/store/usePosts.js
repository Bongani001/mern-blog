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
  post: [],
  isLoading: true,
  fetchLatestPosts: async () => {
    let data = await getLatestPosts(8);
    set({ latestPosts: data });
  },
  fetchMostViewedPosts: async () => {
    let data = await getMostViewedPosts(10);
    set({ mostViewedPosts: data });
  },
  fetchPostsByCategory: async (categoryId) => {
    set({ postsByCategory: [] });

    // Get posts by category (arguments=(category id, number of posts to fetch))
    const data = await getPostsByCategory(categoryId, 10);

    set({ postsByCategory: data });
  },
}));

getLatestPosts(10).then((data) =>
  usePosts.setState({ latestPosts: data, isLoading: false })
);
getMostViewedPosts(10).then((data) =>
  usePosts.setState({ mostViewedPosts: data, isLoading: false })
);

// usePosts.setState((state) => ({ postsByCategory: state.latestPosts }));
