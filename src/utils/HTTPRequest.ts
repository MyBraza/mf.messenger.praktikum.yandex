import queryStringify from "./query-stringify";

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
	DELETE: 'DELETE'
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

	constructor(baseURL: string = './') {
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
	post = (url: string, options: Options = {}) => {
		return this.request(url,
			{...options, method: METHODS.POST},
			options.timeout);
	};
	put = (url: string, options: Options = {}) => {
		return this.request(url,
			{...options, method: METHODS.PUT},
			options.timeout);
	};
	delete = (url: string, options: Options = {}) => {
		return this.request(url,
			{...options, method: METHODS.DELETE},
			options.timeout);
	};

	request = (url: string, options: Options, timeout = 5000) => {
		let {method, data} = options;

		const defaultHeaders: { [key: string]: string } = {
			"accept": "application/json",
			"Content-Type": "application/json"
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			method = method ? method : '';
			xhr.open(method, this.baseURL + url, true);
			xhr.timeout = timeout;
			xhr.withCredentials = true;
			const headers = {...options.headers, ...defaultHeaders};
			for (let key in headers) {
				if (headers.hasOwnProperty(key)) {
					xhr.setRequestHeader(key, headers[key]);
				}
			}

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === 'GET' || !data) {
				xhr.send();
			} else {
				if (data instanceof FormData) {
					xhr.send(<FormData>data);
				} else {
					xhr.send(JSON.stringify(data))
				}
			}
		});

	};
}

export default new HTTPRequest;