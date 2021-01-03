type Indexed = {
	[key: string]: unknown;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
	let target = lhs;
	for (let prop in rhs) {
		if (rhs.hasOwnProperty(prop)) {
			if (Object.prototype.toString.call(rhs[prop]) === '[object Object]') {
				target[prop] = merge(<Indexed>rhs[prop], <Indexed>target[prop]);
			} else {
				target[prop] = rhs[prop];
			}
		}
	}
	return target;
}

export default merge