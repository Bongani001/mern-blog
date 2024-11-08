import { create } from "zustand";
import {
  getAuthorMostViewedPosts,
  getAuthorPosts,
  getUserPostsByCategory,
} from "../services/posts";

export const useUser = create((set) => ({
  user: null,
  userPosts: [],
  userTopPosts: [],
  userPostsByCategory: [],
  isLoading: false,
  setUser: (user) => {
    set({ user });
  },
  fetchAllUserPosts: async (userId, limit) => {
    set({ isLoading: true });

    // Get all posts (argument=(user id,number of posts to fetch))
    const posts = await getAuthorPosts(userId, limit);
    set({ userPosts: posts });
    set({ isLoading: false });
  },
  fetchUserPostsByCategory: async (userId, categoryId, limit) => {
    set({ userPostsByCategory: [] });
    set({ isLoading: true });

    // Get posts filtered by category (arguments=(user id,category id,number of posts to fetch))
    let posts = await getUserPostsByCategory(userId, categoryId, limit);
    set({ userPostsByCategory: posts });
    set({ isLoading: false });
  },
  fetchUserMostViewedPosts: async (userId) => {
    // // Get user's most viewed posts (argument=(author id, number of posts to fetch))
    getAuthorMostViewedPosts(userId, 10).then((data) => {
      useUser.setState({ userTopPosts: data });
    });
  },
}));

let data = localStorage.getItem("userInfo");
data = JSON.parse(data);

const isValidToken = async (token) => {
  try {
    const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);

    // verify the token
    const { payload } = await jose.jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};

if (data != null) {
  if (isValidToken(data.token)) {
    useUser.setState({ user: data });
  } else {
    useUser.setState({ user: null });
    localStorage.removeItem("userInfo");
  }
}
