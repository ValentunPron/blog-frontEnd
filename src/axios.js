import axios from "axios";
//process.env.REACT_APP_API_URL,
//https://kep-blog-server.herokuapp.com
const instance = axios.create({
	baseURL: '/https://kep-blog-server.herokuapp.com'
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