import axios from "axios";

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/categories`
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
