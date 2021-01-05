import Block from "../block";
import template from "./template";
import Router from "../../utils/router";

export default class SettingsItem extends Block {
	props: { [key: string]: unknown };

	constructor(props: { [key: string]: unknown }, classList: string = 'settings-item', parent: string = '', tag: string = 'li') {
		super(props, tag, parent, template, classList);
	}

	componentDidRender() {
		this._element?.addEventListener('click', () => {
			if (!!this.props.path && typeof this.props.path === 'string') {
				const {path} = this.props;
				Router.getInstance().go(path);
			}
			if(!!this.props.callback && typeof this.props.callback === 'function'){
				this.props.callback();
			}
		})
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}