import Block from "../block.js";
import template from "./template.js";
export default class formInput extends Block {
    constructor(props, classList, parent = '') {
        var _a;
        super('div', props, parent, template, `form-input ${classList}`);
        this.validator = (event = null) => {
            var _a, _b;
            event === null || event === void 0 ? void 0 : event.preventDefault();
            const input = (_a = this._element) === null || _a === void 0 ? void 0 : _a.querySelector('input');
            const alert = (_b = this._element) === null || _b === void 0 ? void 0 : _b.querySelector('p');
            if (input !== null && input !== undefined) {
                if (input.value.length === 0) {
                    input.classList.add('error');
                    if (alert) {
                        alert.textContent = 'Поле обязятельно для ввода';
                        alert.style.display = 'block';
                    }
                    return false;
                }
                if (input.type === 'email' && input.value.indexOf('@') === -1) {
                    input.classList.add('error');
                    if (alert) {
                        alert.textContent = 'Некорректный электронный адрес';
                        alert.style.display = 'block';
                    }
                    return false;
                }
                input.classList.remove('error');
                if (alert)
                    alert.style.display = 'none';
                return true;
            }
            return false;
        };
        const input = (_a = this._element) === null || _a === void 0 ? void 0 : _a.querySelector('input');
        input === null || input === void 0 ? void 0 : input.addEventListener('focus', this.validator.bind(this));
        input === null || input === void 0 ? void 0 : input.addEventListener('blur', this.validator.bind(this));
    }
    render() {
        let form = this.compile(this.template);
        return form(this.props);
    }
}
//# sourceMappingURL=form-input.js.map