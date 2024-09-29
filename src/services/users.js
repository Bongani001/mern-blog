import axios from "axios";

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });
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

export const registerUser = async ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/register",
      { email, username, password, confirmPassword }
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
