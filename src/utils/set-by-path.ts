interface Indexed {
	[key: string]: unknown
}

const setByPath = (obj: Indexed, newState: unknown, path: string | undefined): void => {
	if (!newState) {
		return;
	}
	if (!path) {
		Object.assign(obj, newState);
		return;
	}
	const pathArray = path.split('.');
	Object.assign(obj,
		pathArray.reduceRight((acc, val) => ({[val]: acc}), newState));
};

export default setByPath;
