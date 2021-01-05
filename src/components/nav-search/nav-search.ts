import Block from "../block";
import template from "./template";

export default class NavSearch extends Block{
    constructor(props: {},  classList: string,parent:string='',) {
        super(props,'div', parent, template, `nav-search ${classList}`);
    }

    render(): string {
        let element = this.compile(this.template);
        return element(this.props);
    }
}