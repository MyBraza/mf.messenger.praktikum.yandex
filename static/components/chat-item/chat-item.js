import Block from "../block.js";
import template from "./template.js";
export default class chatItem extends Block {
    constructor(props, id, classList = 'chat-item', parent = '', tag = 'li') {
        super(tag, props, parent, template, classList);
        if (this._element)
            this._element.dataset.id = id;
    }
    render() {
        let element = this.compile(this.template);
        return element(this.props);
    }
}
//# sourceMappingURL=chat-item.js.map