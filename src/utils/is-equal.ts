type Indexed = { [key: string]: unknown }

function isEqual(a: Indexed, b: Indexed): boolean {
	let equal = true;
	if (!a || !b) {
		return false
	}
	let keysA = Object.keys(a);
	let keysB = Object.keys(b);
	let intersection = keysA.filter(x => keysB.includes(x));
	if (keysA.length !== intersection.length || keysB.length !== intersection.length) {
		return false
	}
	for (let key in a) {
		if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
			if (Object.prototype.toString.call(a[key]) === '[object Object]' && Object.prototype.toString.call(b[key]) === '[object Object]') {
				if (!isEqual(<Indexed>a[key], <Indexed>b[key]))
					return false
			} else if (Array.isArray(a[key]) && Array.isArray(b[key])) {
				let arrA = <Array<unknown>>a[key];
				let arrB = <Array<unknown>>b[key];
				if (arrA === arrB) return true;
				if (arrA == null || arrB == null) return false;
				if (arrA.length !== arrB.length) return false;

				for (let i = 0; i < arrA.length; ++i) {
					if (arrA[i] !== arrB[i]) return false;
				}
			} else {
				if (!(a[key] === b[key]))
					return false
			}
		} else {
			return true
		}
	}
	return equal;
}

export default isEqual