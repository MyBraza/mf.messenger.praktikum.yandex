import Block from "../block.js";
import template from "./template.js";
export default class message extends Block {
    constructor(props, classList = '', parent = '', tag = 'li') {
        super(tag, props, parent, template, `message ${classList}`);
    }
    render() {
        let element = this.compile(this.template);
        return element(this.props);
    }
}
//# sourceMappingURL=message.js.map