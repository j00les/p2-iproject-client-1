import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://book-libraiii.herokuapp.com",
});

export default instance;
