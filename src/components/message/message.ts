import Block from "../block";
import template from "./template";

export default class Message extends Block {
	constructor(props: {}, classList: string = '', parent = '', tag: string = 'li') {
		super(props, tag, parent, template, `message ${classList}`);
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}