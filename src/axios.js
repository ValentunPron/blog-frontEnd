import axios from "axios";
//process.env.REACT_APP_API_URL,
const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
	(config) => {
	  const token = localStorage.getItem("token");
	  if (token) {
		config.headers.authorization = token;
	  }
	  return config;
	},
	(error) => Promise.reject(error)
 );

export default instance;