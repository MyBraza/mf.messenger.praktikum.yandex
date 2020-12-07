import Block from "../block.js";
import template from "./template.js";

export default class Message extends Block{
    constructor(props: {}, classList: string = '', parent = '', tag:string = 'li') {
        super(tag, props, parent, template, `message ${classList}`);
    }

    render(): string {
        let element = this.compile(this.template);
        return element(this.props);
    }
}