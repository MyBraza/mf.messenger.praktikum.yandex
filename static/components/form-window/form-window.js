import Block from "../block.js";
import template from "./template.js";
import formInput from "../form-input/form-input.js";
import formButton from "../button/form-button.js";
import formItemsHelper from "../../js/formItemsHelper.js";
formItemsHelper();
export default class formWindow extends Block {
    constructor(props, classList, parent = '') {
        var _a;
        super('main', props, parent, template, classList);
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
            window.location.href = "home.html";
        }
    }
    componentDidMount() {
        let skip = [];
        for (let item in this.props.items) {
            if (this.props.items.hasOwnProperty(item) && !skip.includes(item) && item !== 'button') {
                let itemProps = Object.assign({}, this.props.items[item]);
                itemProps.id = item;
                let neighbor = itemProps.with !== undefined ? itemProps.with : undefined;
                if (neighbor !== undefined && !skip.includes(neighbor)) {
                    let neighborProps = Object.assign({}, this.props.items[neighbor]);
                    neighborProps.id = neighbor;
                    this.childBlocks[neighbor] = new formInput(neighborProps, 'form-window__item', `#${item}-container`);
                    skip.push(neighbor);
                }
                this.childBlocks[item] = new formInput(itemProps, 'form-window__item', `#${item}-container`);
            }
        }
        this.childBlocks.button = new formButton(this.props.button, undefined, '', '.form-window__buttons');
    }
    render() {
        let form = this.compile(template);
        return form(this.props);
    }
}
//# sourceMappingURL=form-window.js.map