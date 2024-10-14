import axios from "axios";

export const getAllPostComments = async (postId) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/comments?postId=${postId}`
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

export const postComment = async (comment, token) => {
  try {
    const { data } = await axios.post(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/comments/create?postId=${comment.postId}`,
      {
        postId: comment.postId,
        content: comment.content,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
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

export const deleteComment = async (commentId, token) => {
  try {
    const { data } = await axios.delete(
      `${
        import.meta.env.VITE_NODE_ENV === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000"
      }/api/comments/delete/${commentId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    if (error.message === "Network Error") {
      return error.message;
    } else if (!error.response?.data) {
      return error.response;
    }

    return error.response.data;
  }
};
