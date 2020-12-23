import Router from "../../utils/router.js";
import Block from "../block.js";
import template from "./template.js";

export default class ErrorPage extends Block {
	constructor(props: {}, classList: string, parent: string = '',) {
		super(props, 'main', parent, template, classList);
		const button = this._element?.querySelector('.error-window__button');
		button?.addEventListener('click', () => {
			Router.getInstance().go();
		});
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}