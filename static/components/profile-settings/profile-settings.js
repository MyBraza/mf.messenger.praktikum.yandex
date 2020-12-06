import Block from "../block.js";
import template from "./template.js";
import formInput from "../form-input/form-input.js";
import formButton from "../button/form-button.js";
import formItemsHelper from "../../js/formItemsHelper.js";
formItemsHelper();
export default class profileSettings extends Block {
    constructor(props, classList, parent = '') {
        var _a;
        super('main', props, parent, template, `profile-settings ${classList}`);
        this._attach();
        const form = (_a = this._element) === null || _a === void 0 ? void 0 : _a.querySelector('form');
        form === null || form === void 0 ? void 0 : form.addEventListener('submit', this.onsubmit.bind(this));
    }
    ;
    onsubmit(event) {
        event.preventDefault();
        let flag = true;
        for (let key in this.childBlocks) {
            let item = this.childBlocks[key];
            if (item instanceof formInput) {
                let result = item.validator();
                flag = result ? flag : result;
            }
        }
        if (flag) {
            const callback = this.props.onSubmit ? this.props.onSubmit : () => {
                console.log('form submitted');
            };
            callback();
        }
    }
    componentDidMount() {
        let skip = [];
        for (let item in this.props.elements.settingsFormInputs) {
            if (this.props.elements.settingsFormInputs.hasOwnProperty(item) && !skip.includes(item) && item !== 'button') {
                let itemProps = Object.assign({}, this.props.elements.settingsFormInputs[item]);
                itemProps.id = item;
                let neighbor = itemProps.with !== undefined ? itemProps.with : undefined;
                if (neighbor !== undefined && !skip.includes(neighbor)) {
                    let neighborProps = Object.assign({}, this.props.elements.settingsFormInputs[neighbor]);
                    neighborProps.id = neighbor;
                    this.childBlocks[neighbor] = new formInput(neighborProps, 'form-window__item', `#${item}-container`);
                    skip.push(neighbor);
                }
                this.childBlocks[item] = new formInput(itemProps, 'form-window__item', `#${item}-container`);
            }
        }
        this.childBlocks.submitButton = new formButton(this.props.elements.submitButton, undefined, '', '.form-window__buttons_row');
        this.childBlocks.cancelButton = new formButton(this.props.elements.cancelButton, this.props.onCancel, '', '.form-window__buttons_row');
    }
    render() {
        let form = this.compile(template);
        return form(this.props.elements);
    }
}
//# sourceMappingURL=profile-settings.js.map