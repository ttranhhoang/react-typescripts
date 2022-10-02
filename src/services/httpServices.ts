import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

enum StatusCode {
	Unauthorized = 401,
	Forbidden = 403,
	TooManyRequests = 429,
	InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
	Accept: 'application/json',
	'Content-Type': 'application/json; charset=utf-8',
	'Access-Control-Allow-Credentials': true,
	'X-Requested-With': 'XMLHttpRequest',
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
	try {
		const token = localStorage.getItem('accessToken');

		if (token != null) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		}
		return config;
	} catch (error: any) {
		throw new Error(error);
	}
};

class Http {
	private instance: AxiosInstance | null = null;

	private get http(): AxiosInstance {
		return this.instance != null ? this.instance : this.initHttp();
	}
	static queryParamsURLEncodedString(params: Record<string, any>): string {
		const str: string[] = [];
		for (const p in params) {
			if (typeof params[p] === 'object') {
				for (const v in params[p]) {
					str.push(encodeURIComponent(`${p}.${v}`) + '=' + encodeURIComponent(params[p][v]));
				}
			} else {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
			}
		}
		return str.join('&');
	}
	initHttp() {
		const http = axios.create({
			baseURL: BASE_URL_API,
			headers,
			withCredentials: true,
		});

		http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

		http.interceptors.response.use(
			(response) => response,
			(error) => {
				const { response } = error;
				return this.handleError(response);
			}
		);

		this.instance = http;
		return http;
	}

	// request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
	// 	return this.http.request(config);
	// }
	request<T = unknown, R = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<R>> {
		return this.http.request<T, AxiosResponse<R>>(config);
	}

	// get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
	// 	return this.http.get<T, R>(url, config);
	// }

	get<T = unknown, R = unknown>(
		url: string,
		data?: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		const query = data ? Http.queryParamsURLEncodedString(data) : '';
		return this.http.get<T, AxiosResponse<R>>(url + '?' + query, config);
	}

	post<T = any, R = AxiosResponse<T>>(
		url: string,
		data?: T,
		config?: AxiosRequestConfig
	): Promise<R> {
		return this.http.post<T, R>(url, data, config);
	}

	put<T = any, R = AxiosResponse<T>>(
		url: string,
		data?: T,
		config?: AxiosRequestConfig
	): Promise<R> {
		return this.http.put<T, R>(url, data, config);
	}

	delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.delete<T, R>(url, config);
	}

	// Handle global app errors
	// We can handle generic app errors depending on the status code
	private handleError(error: any) {
		const { status } = error;

		switch (status) {
			case StatusCode.InternalServerError: {
				// Handle InternalServerError
				break;
			}
			case StatusCode.Forbidden: {
				// Handle Forbidden
				break;
			}
			case StatusCode.Unauthorized: {
				// Handle Unauthorized
				break;
			}
			case StatusCode.TooManyRequests: {
				// Handle TooManyRequests
				break;
			}
		}

		return Promise.reject(error);
	}
}

export const http = new Http();
