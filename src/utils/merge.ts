type Indexed = {
	[key: string]: unknown;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
	const target = lhs;
	for (const prop in rhs) {
		if (Object.prototype.hasOwnProperty.call(rhs, prop)) {
			if (Object.prototype.toString.call(rhs[prop]) === '[object Object]') {
				target[prop] = merge(<Indexed>rhs[prop], <Indexed>target[prop]);
			} else {
				target[prop] = rhs[prop];
			}
		}
	}
	return target;
}

export default merge;
