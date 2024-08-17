import axios from 'axios';
/***********************************************/
/************CONFIG AXIOS AND ADAPTER **********/
/***********************************************/
const AxiosFn = axios.create();

AxiosFn.interceptors.request.use(
	config => {
		config.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=UTF-8',
		};
		return config;
	},
	error => {
		Promise.reject(error);
	},
);

export const HttpGet = async url => {
	try {
		return await AxiosFn.get(url);
	} catch (e) {
		return e.response;
	}
};
