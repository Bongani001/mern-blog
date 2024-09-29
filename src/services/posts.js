import axios from "axios";

export const getLatestPosts = async (limit) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/posts?limit=${limit}`
    );
    return data;
  } catch (error) {
    if (error.message === "Network Error") {
      return error.message;
    } else if (!error.response?.data) {
      return error.response;
    }

    return error.response.data;
  }
};

export const getMostViewedPosts = async (limit) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/posts?limit=${limit}&views=true`
    );
    return data;
  } catch (error) {
    if (error.message === "Network Error") {
      return error.message;
    } else if (!error.response?.data) {
      return error.response;
    }

    return error.response.data;
  }
};

export const getOnePost = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
    return data;
  } catch (error) {
    if (error.message === "Network Error") {
      return error.message;
    } else if (!error.response?.data) {
      return error.response;
    }

    return error.response.data;
  }
};
