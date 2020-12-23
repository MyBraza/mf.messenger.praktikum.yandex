export default '<div class="profile-settings__image">' +
'	<img src="img/alex-suprun-ZHvM3XIOHoE-unsplash-min.jpg" alt=""/>' +
'	<div class="profile-settings__status">' +
'		<i class="icon-edit" id="image-input"></i>' +
'	</div>' +
'</div>' +
'<form class="profile-settings__form" method="post" name="profile-info">' +
'<div class="profile-settings__form__input-list">' +
'<input type="file" id="avatar" name="avatar" hidden/>' +
'{{#formItems this.formInputs}}' +
'<div class="form-window__login-form__row" id="{{id}}-container"></div>' +
'{{/formItems}}' +
'</div>' +
'<div class="form-window__buttons_row"></div>' +
'</form>'