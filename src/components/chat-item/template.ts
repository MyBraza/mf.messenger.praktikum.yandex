Handlebars.registerHelper('isdefined', function (value) {
	return value !== undefined;
});

export default '<div class="chat-item__image">' +
'<div class="chat-item__status chat-item__status_{{status}}">' +
'<i class="{{icon}}"></i>' +
'    </div>' +
'{{#if (isdefined imgURL)}}' +
'    <img src="{{imgURL}}" alt=""/>' +
'{{/if}}' +
'    </div>' +
'    <div class="chat-item__text">' +
'<h2 class="chat-item__name">{{displayName}}</h2>' +
'<p class="chat-item__last-message">' +
'    {{text}}' +
'</p>' +
'</div>'