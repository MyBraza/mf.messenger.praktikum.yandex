import Block from "../block.js";
import template from "./template.js";
import chatItem from "../chat-item/chat-item.js";
import settingsItem from "../settings-item/settings-item.js";

interface Props {
	items: {
		[key: string]: {
			[key: string]: string;
		}
	}
	type?: string;
	render?: string;
}

export default class NavList extends Block {
	navItems: { [key: string]: chatItem };
	props: Props;

	constructor(props: Props, callback: (element: HTMLElement) => void = () => {
	}, classList: string = '', parent: string = '', tag: string = 'ul') {
		super(props, tag, parent, template, `nav-list ${classList}`);
		const items = this._element?.getElementsByTagName('li');
		if (items) {
			for (let i = 0; i < items?.length; i++) {
				items[i].addEventListener('click', event => {
					event.preventDefault();
					const element = (<HTMLElement>event.currentTarget);
					console.log(element.tagName);
					callback(element);
				})
			}
		}
	}

	componentDidMount() {
		this.navItems = {};
		for (let k in this.props.items) {
			this.navItems[k] = this.props.type === 'settings' ? new settingsItem(this.props.items[k]) : new chatItem(this.props.items[k], k);
		}
	}

	render(): string {
		let render = '';
		for (let k in this.props.items) {
			this.navItems[k].setProps(this.props.items[k]);
			render += this.navItems[k].getContent();
		}
		let element = this.compile(this.template);
		return element({render: render});
	}
}