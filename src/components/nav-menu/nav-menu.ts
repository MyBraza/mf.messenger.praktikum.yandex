import Block from "../block.js";
import template from "./template.js";
import navList from "../nav-list/nav-list.js";
import UserBar from "../user-bar/user-bar.js";

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

export default class NavMenu extends Block {
	childBlocks: {
		list: navList;
		userBar: UserBar;
	};
	props: Props;

	constructor(props: Props, classList: string, parent: string = '', tag = 'aside') {
		super(tag, props, parent, template, `nav-menu ${classList}`);
		this._attach();
	}

	componentDidMount() {
		const {userBar, chooseItem, list} = this.props;
		this.childBlocks.userBar = new UserBar(userBar);
		this.childBlocks.list = new navList(list, chooseItem, 'nav-menu__list', '.nav-menu__scrollable');
	}

	render(): string {
		const {userBar, list} = this.props;
		this.childBlocks.userBar.setProps(userBar);
		this.childBlocks.list.setProps(list);
		let element = this.compile(this.template);
		return element({listContainer: 'nav-menu__scrollable'});
	}
}