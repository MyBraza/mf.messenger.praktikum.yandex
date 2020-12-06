import Block from "../block.js";
import template from "./template.js";
export default class messageInput extends Block {
    constructor(props, classList = '', parent = '', tag = 'div') {
        super(tag, props, parent, template, `${classList}`);
    }
    render() {
        let element = this.compile(this.template);
        return element(this.props);
    }
}
//# sourceMappingURL=message-input.js.map