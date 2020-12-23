import queryStringify from "./query-stringify";

interface Options {
	data?: { [key: string]: unknown }
	headers?: { [key: string]: string }
	timeout?: number;
	method: string;

	[key: string]: unknown
}

const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};

class HTTPRequest {
	get = (url: string, options: Options) => {
		if (!options) {
			throw new Error('Options must be defined')
		}
		const data = options.data ? options.data : {};
		const timeout = options.timeout ? options.timeout : undefined;
		return this.request(url + queryStringify(data),
			{...options, method: METHODS.GET},
			timeout);
	};
	post = (url: string, options: Options) => {
		if (!options) {
			throw new Error('Options must be defined')
		}
		return this.request(url,
			{...options, method: METHODS.POST},
			options.timeout);
	};
	put = (url: string, options: Options) => {
		if (!options) {
			throw new Error('Options must be defined')
		}
		return this.request(url,
			{...options, method: METHODS.PUT},
			options.timeout);
	};
	delete = (url: string, options: Options) => {
		if (!options) {
			throw new Error('Options must be defined')
		}
		return this.request(url,
			{...options, method: METHODS.DELETE},
			options.timeout);
	};

	request = (url: string, options: Options, timeout = 5000) => {
		const {method, data} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.timeout = timeout;
			for (let key in options.headers) {
				if (options.headers.hasOwnProperty(key)) {
					xhr.setRequestHeader(key, options.headers[key]);
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
				xhr.send(JSON.stringify(data));
			}
		});

	};
}

export default new HTTPRequest