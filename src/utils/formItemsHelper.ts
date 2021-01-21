import * as Handlebars from 'handlebars';

const arrangeFormInputsHelper = (): void => {
	Handlebars.registerHelper('formItems', (context, options) => {
		const cells = [];
		const skip: Array<string> = [];
		let html;
		for (const k in context) {
			if (Object.prototype.hasOwnProperty.call(context, k) && !skip.includes(k)) {
				if (context[k].with !== undefined && !skip.includes(context[k].with)) {
					skip.push(context[k].with);
				}
				html = options.fn({
					id: k,
				});
				cells.push(html);
			}
		}
		return cells.join('');
	});
};

export default arrangeFormInputsHelper;
