export default '<div class="message__image">' +
'	<img src="{{avatar}}" alt=""/>' +
'</div>' +
'<div class="message__text">' +
'	<div class="message__info">' +
'		<h2 class="message__name">{{user.display_name}}</h2>' +
'		<time class="message__date">{{message.time}}</time>' +
'	</div>' +
'	<div class="message__content">{{message.content}}</div>' +
'</div>'