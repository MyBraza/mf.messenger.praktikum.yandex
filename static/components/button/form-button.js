import Block from "../block.js";
import template from "./template.js";
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
export default class formButton extends Block {
    constructor(props, callback, classList = '', parent = '') {
        var _a;
        super('div', props, parent, template, `form-button-container ${classList}`);
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', event => {
            if (callback) {
                event.preventDefault();
                callback();
            }
        });
    }
    render() {
        let form = this.compile(this.template);
        return form(this.props);
    }
}
//# sourceMappingURL=form-button.js.map