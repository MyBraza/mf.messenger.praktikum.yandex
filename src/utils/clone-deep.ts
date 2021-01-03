type Indexed = { [key: string]: unknown }

function cloneDeep(obj: unknown): Indexed|unknown {
	if (Object.prototype.toString.call(obj) === '[object Object]') {
		let object = <Indexed>obj;
		let target: Indexed = {};
		for (let prop in object) {
			if (object.hasOwnProperty(prop)) {
				// if the value is a nested object, recursively copy all it's properties
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
		let array = <Array<unknown>>obj;
		let target: Array<unknown> = [];
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

export default cloneDeep