import Block from "../block.js";
import template from "./template.js";

export default class navSearch extends Block{
    constructor(props: {},  classList: string,parent:string='',) {
        super('div', props,parent, template, `nav-search ${classList}`);
    }

    render(): string {
        let element = this.compile(this.template);
        return element(this.props);
    }
}