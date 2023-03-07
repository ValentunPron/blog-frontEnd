import axios from "axios";

const instance = axios.create({
	baseURL: 'https://api.render.com/deploy/srv-cg3iaid269v3bpal1phg?key=918Xw_qvDUc'
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token');
	return config;
})

export default instance;