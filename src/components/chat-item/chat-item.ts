import Block from "../block.js";
import template from "./template.js";

export default class ChatItem extends Block {
	constructor(props: {}, id: string, classList: string = 'chat-item', parent: string = '', tag: string = 'li') {
		super(tag, props, parent, template, classList);
		if (this._element)
			this._element.dataset.id = id;
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}