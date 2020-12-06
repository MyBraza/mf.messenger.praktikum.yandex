import Block from "../block.js";
import template from "./template.js";
export default class navSearch extends Block {
    constructor(props, classList, parent = '') {
        super('div', props, parent, template, `nav-search ${classList}`);
    }
    render() {
        let element = this.compile(this.template);
        return element(this.props);
    }
}
//# sourceMappingURL=nav-search.js.map