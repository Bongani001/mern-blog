import axios from "axios";

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });
    return console.log(data);
  } catch (error) {
    return error.response.data;
  }
};
