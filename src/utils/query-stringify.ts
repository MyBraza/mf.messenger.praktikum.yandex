type StringIndexed = Record<string, unknown>;

function queryStringify(data: StringIndexed, parentKey = ''): string | never {
	if (Object.prototype.toString.call(data) !== '[object Object]' && Object.prototype.toString.call(data) !== '[object Array]') {
		throw new Error('input must be an object')
	}
	let str = '';
	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			let val = data[key];
			if (Object.prototype.toString.call(val) === '[object Array]' || Object.prototype.toString.call(val) === '[object Object]') {
				str += str.length > 1 ? '&' : '';
				str += queryStringify((<StringIndexed>val), parentKey ? `${parentKey}[${key}]` : key);
			} else {
				str += str.length > 0 ? '&' : '';
				str += parentKey ? `${parentKey}[${key}]=${val}` : `${key}=${val}`;
			}
		}
	}
	return str;
}

export default queryStringify