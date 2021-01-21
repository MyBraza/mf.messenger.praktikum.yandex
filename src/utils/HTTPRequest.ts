import queryStringify from './query-stringify';

interface Options {
	data?: { [key: string]: unknown } | FormData;
	headers?: { [key: string]: string }
	timeout?: number;
	method?: string;

	[key: string]: unknown
}

const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

class HTTPRequest {
	private static __instance: HTTPRequest;

	public static getInstance(...args: Array<string | undefined>): HTTPRequest {
		if (!HTTPRequest.__instance) {
			HTTPRequest.__instance = new HTTPRequest(...args);
		}

		return HTTPRequest.__instance;
	}

	baseURL: string;

	constructor(baseURL = './') {
		if (HTTPRequest.__instance) {
			return HTTPRequest.__instance;
		}

		this.baseURL = baseURL;
		HTTPRequest.__instance = this;
	}

	get = (url: string, options: Options = {}) => {
		const data = options.data ? options.data : {};
		return this.request(url + queryStringify(<{ [key: string]: unknown }>data),
			{...options, method: METHODS.GET},
			options.timeout);
	};

	post = (url: string, options: Options = {}) => this.request(url,
		{...options, method: METHODS.POST},
		options.timeout);

	put = (url: string, options: Options = {}) => this.request(url,
		{...options, method: METHODS.PUT},
		options.timeout);

	delete = (url: string, options: Options = {}) => this.request(url,
		{...options, method: METHODS.DELETE},
		options.timeout);

	request = (url: string, options: Options, timeout = 5000) => {
		let {method} = options;
		const {data} = options;

		const defaultHeaders: { [key: string]: string } = {
			accept: 'application/json',
			'Content-Type': 'application/json',
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			method = method || '';
			xhr.open(method, this.baseURL + url, true);
			xhr.timeout = timeout;
			xhr.withCredentials = true;
			const headers = {...defaultHeaders, ...options.headers};
			for (const key in headers) {
				if (Object.prototype.hasOwnProperty.call(headers, key) && headers[key].length > 0) {
					xhr.setRequestHeader(key, headers[key]);
				}
			}

			xhr.onload = function () {
				let response;
				try {
					response = JSON.parse(xhr.response);
				} catch (e) {
					console.log(e.message);
					response = xhr.response;
				}
				if (!(xhr.status >= 200 && xhr.status <= 299)) {
					reject(response);
				}
				resolve(response);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === 'GET' || !data) {
				xhr.send();
			} else if (data instanceof FormData) {
				xhr.send(data as FormData);
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}

export default new HTTPRequest();
