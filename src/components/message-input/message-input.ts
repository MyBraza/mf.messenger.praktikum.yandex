import Block from "../block";
import template from "./template";

export default class MessageInput extends Block {
	constructor(props: {}, classList: string = '', parent = '', tag: string = 'div') {
		super(props, tag, parent, template, `${classList}`);
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}