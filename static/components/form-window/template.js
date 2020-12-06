export default '<form class="form-window {{classExtension}}"' +
    '	method="post"' +
    '	name="authorization">' +
    '		<h1 class="form-window__tittle">{{tittle}}</h1>' +
    '		<div class="form-window__login-form">' +
    '{{#formItems this.items}}' +
    '<div class="form-window__login-form__row" id="{{id}}-container"></div>' +
    '{{/formItems}}' +
    '		</div>' +
    '		<div class="form-window__buttons form-window__buttons_col">' +
    '		<div class="form-button form-button_empty"><a href="{{link.href}}">{{link.text}}</a></div>' +
    '	</div>' +
    '	</form>';
//# sourceMappingURL=template.js.map