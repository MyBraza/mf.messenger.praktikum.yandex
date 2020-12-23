import Block from "../block.js";
import template from "./template.js";

export default class NavSearch extends Block{
    constructor(props: {},  classList: string,parent:string='',) {
        super(props,'div', parent, template, `nav-search ${classList}`);
    }

    render(): string {
        let element = this.compile(this.template);
        return element(this.props);
    }
}