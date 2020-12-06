import Block from "../block.js";
import template from "./template.js";
export default class settingsItem extends Block {
    constructor(props, classList = 'settings-item', parent = '', tag = 'li') {
        super(tag, props, parent, template, classList);
    }
    render() {
        let element = this.compile(this.template);
        return element(this.props);
    }
}
//# sourceMappingURL=settings-item.js.map