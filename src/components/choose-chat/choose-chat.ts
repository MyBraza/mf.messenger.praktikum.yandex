import Block from "../block";
import template from "./template";

export default class ChooseChat extends Block {
	constructor(props: {}, classList: string, parent: string = '',) {
		super(props,'div',  parent, template, classList);
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}