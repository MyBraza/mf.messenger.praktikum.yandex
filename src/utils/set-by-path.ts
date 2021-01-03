interface Indexed {
	[key: string]: unknown
}

const setByPath = (obj: Indexed, newState: unknown, path: string | undefined) => {
	if (!newState) {
		return;
	}
	if (!path) {
		Object.assign(obj, newState);
		return;
	}
	let pathArray = path.split('.');
	Object.assign(obj,
		pathArray.reduceRight((acc, val) => {
			return {[val]: acc}
		}, newState));
};

export default setByPath;