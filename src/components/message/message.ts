import Block from "../block";
import template from "./template";

export default class Message extends Block {
	props: {
		[key: string]: { [key: string]: string }
	};

	constructor(props: {}, classList: string = '', parent = '', tag: string = 'div') {
		super(props, tag, parent, template, `message ${classList}`);
	}

	render(): string {
		let avatar = this.props.user?.avatar;
		avatar = avatar ? `https://ya-praktikum.tech/${avatar}` : 'img/placeholder.jpg';
		let element = this.compile(this.template);
		return element({...this.props, avatar});
	}
}