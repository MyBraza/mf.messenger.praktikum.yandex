export default (): void => {
	Handlebars.registerHelper('formItems', function (context, options) {
		let cells = [];
		let skip: Array<string> = [];
		let html;
		for (let k in context) {
			if (context.hasOwnProperty(k) && !skip.includes(k)) {
				if (context[k].with !== undefined && !skip.includes(context[k].with)) {
					skip.push(context[k].with);
				}
				html = options.fn({
					id: k
				});
				cells.push(html);
			}
		}
		return cells.join('');
	})
}