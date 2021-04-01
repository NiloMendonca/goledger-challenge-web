import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-54-173-117-139.compute-1.amazonaws.com/api/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});