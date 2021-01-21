type Indexed = { [key: string]: unknown }

function cloneDeep(obj: unknown): Indexed | unknown {
	if (Object.prototype.toString.call(obj) === '[object Object]') {
		const object = <Indexed>obj;
		const target: Indexed = {};
		for (const prop in object) {
			if (Object.prototype.hasOwnProperty.call(object, prop)) {
				if (typeof object[prop] === 'object') {
					target[prop] = cloneDeep(object[prop]);
				} else {
					target[prop] = object[prop];
				}
			}
		}
		return target;
	}
	if (Object.prototype.toString.call(obj) === '[object Array]') {
		const array = <Array<unknown>>obj;
		const target: Array<unknown> = [];
		array.forEach((val, i) => {
			if (typeof val === 'object') {
				target[i] = cloneDeep(val);
			} else {
				target[i] = val;
			}
		});
		return target;
	}
	return obj;
}

export default cloneDeep;
