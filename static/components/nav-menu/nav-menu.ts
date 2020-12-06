import Block from "../block.js";
import template from "./template.js";
import navList from "../nav-list/nav-list.js";
import userBar from "../user-bar/user-bar.js";

interface Props {
	list: {
		items: {
			[key: string]: {
				[key: string]: string;
			}
		}
		type?: string;
	}
	userBar: {
		render: {
		[key: string]: string}
		cogButtonCallback?: ()=>void
	}
	chooseItem?: (element:HTMLElement)=>void;
	render?: {
		list: string
		userBar: string
	};
	currentMenu?: string;
}

export default class navMenu extends Block {
	childBlocks: {
		list: navList;
		userBar: userBar;
	};
	props: Props;

	constructor(props: Props, classList: string, parent: string = '', tag = 'aside') {
		super(tag, props, parent, template, `nav-menu ${classList}`);
		this._attach();
	}

	componentDidMount() {
		this.childBlocks.userBar = new userBar(this.props.userBar);
		this.childBlocks.list = new navList(this.props.list, this.props.chooseItem, 'nav-menu__list', '.nav-menu__scrollable');
	}

	render(): string {
		this.childBlocks.userBar.setProps(this.props.userBar);
		this.childBlocks.list.setProps(this.props.list);
		let element = this.compile(this.template);
		return element({listContainer: 'nav-menu__scrollable'});
	}
}