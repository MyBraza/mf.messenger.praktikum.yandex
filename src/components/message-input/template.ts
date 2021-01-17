export default '<form class="message-input" name="{{formName}}">' +
'<i class="{{pasteIcon}}"></i>' +
'	<label for="{{formName}}-message"></label>' +
'	<input autocomplete="off" type="text" id="{{formName}}-message" name="{{formName}}-message" placeholder="{{placeholder}}"/>' +
'	<button type="submit" class="message-input__empty-button" id="{{formName}}-submit-button" data-form-name="{{formName}}">' +
'       <i class="{{sendIcon}}"></i>' +
'	</button>    ' +
'</form>'