import axios from "axios";

export const getLatestPosts = async (limit) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/posts?limit=${limit}`
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
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : `http://localhost:5000`
      }/api/posts?limit=${limit}&views=true`
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

export const getPostsByCategory = async (id, limit) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/posts/categories?categoryid=${id}&limit=${limit}`
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

export const getUserPostsByCategory = async (authorId, categoryId, limit) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/posts/authors/${authorId}/categories?categoryid=${categoryId}&limit=${limit}`
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

// Get a specific post
export const getOnePost = async (id) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/posts/${id}`
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

export const getAuthorPosts = async (authorId, limit = 0) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/posts/authors/${authorId}?limit=${limit}`
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

export const getAuthorMostViewedPosts = async (authorId, limit = 0) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/posts/authors/${authorId}?limit=${limit}$views=true`
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

export const createPost = async (formData, token) => {
  try {
    const { data } = await axios.post(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/posts/create`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      }
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

export const editPost = async (formData, postId, token) => {
  try {
    const { data } = await axios.post(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/posts/update/${postId}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.log("the error", error);
    if (error.message === "Network Error") {
      return error.message;
    } else if (!error.response?.data) {
      return error.response;
    }
    return error.response.data;
  }
};

export const deletePost = async (postId, token) => {
  try {
    const { data } = await axios.delete(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/posts/delete/${postId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    // console.log("the error", error);
    if (error.message === "Network Error") {
      return error.message;
    } else if (!error.response?.data) {
      return error.response;
    }
    return error.response.data;
  }
};
