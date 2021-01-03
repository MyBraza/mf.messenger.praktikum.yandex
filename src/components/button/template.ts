Handlebars.registerHelper('properties', function (context, options) {
	let cells = [];
	let html;
	for (let k in context) {
		if (context.hasOwnProperty(k)) {
			html = options.fn({
				key: k,
				value: context[k]
			});
			cells.push(html);
		}
	}
	return cells.join('');
});

export default '   <button' +
'   {{#properties this.attributes}}' +
'   {{key}} = "{{value}}"' +
'   {{/properties}}' +
'		>' +
'		{{text}}' +
'	</button>'