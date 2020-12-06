import Block from "../block.js";
import template from "./template.js";
export default class errorPage extends Block {
    constructor(props, classList, parent = '') {
        super('main', props, parent, template, classList);
    }
    render() {
        let element = this.compile(this.template);
        return element(this.props);
    }
}
//# sourceMappingURL=error-page.js.map