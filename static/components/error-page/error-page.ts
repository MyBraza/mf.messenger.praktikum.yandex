import Block from "../block.js";
import template from "./template.js";

export default class errorPage extends Block{
	constructor(props: {},  classList: string,parent:string='',) {
		super('main', props,parent, template, classList);
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}