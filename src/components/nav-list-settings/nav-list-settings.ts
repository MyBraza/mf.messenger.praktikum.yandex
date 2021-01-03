import Block from "../block.js";
import template from "./template.js";
import settingsItem from "../settings-item/settings-item.js";

interface Props {
	items: {
		[key: string]: {
			[key: string]: string
		}
	}
}

export default class NavListSettings extends Block {
	props: Props;

	constructor(props: Props, classList: string = '', parent: string = '', tag: string = 'ul') {
		super(props, tag, parent, template, `nav-list-settings ${classList}`);
		this._attach();
	}

	componentDidRender() {
		const {items} = this.props;
		for (let key in items) {
			this.childBlocks[key] = new settingsItem(items[key]);
		}
		this._attach();
	}

	render(): string {
		let page = this.compile(template);
		return page({});
	}
}