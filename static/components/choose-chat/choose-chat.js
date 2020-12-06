import Block from "../block.js";
import template from "./template.js";
export default class chooseChat extends Block {
    constructor(props, classList, parent = '') {
        super('div', props, parent, template, classList);
    }
    render() {
        let element = this.compile(this.template);
        return element(this.props);
    }
}
//# sourceMappingURL=choose-chat.js.map