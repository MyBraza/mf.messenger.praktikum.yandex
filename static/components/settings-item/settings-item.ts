import Block from "../block.js";
import template from "./template.js";

export default class settingsItem extends Block {


	constructor(props: {},classList: string = 'settings-item', parent: string = '', tag: string = 'li') {
		super(tag, props, parent, template, classList);
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}