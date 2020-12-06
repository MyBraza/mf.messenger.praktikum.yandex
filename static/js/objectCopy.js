function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
function objectCopy(src) {
    let target = {};
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            // if the value is a nested object, recursively copy all it's properties
            if (isObject(src[prop])) {
                target[prop] = objectCopy(src[prop]);
            }
            else {
                target[prop] = typeof src[prop] === "function" ? src[prop].bind(target) : src[prop];
            }
        }
    }
    return target;
}
export default objectCopy;
//# sourceMappingURL=objectCopy.js.map