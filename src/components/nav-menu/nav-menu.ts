import Block from 'components/block';
import template from './template';
import NavList from '../nav-list/nav-list';
import UserBar from '../user-bar/user-bar';
import NavListSettings from '../nav-list-settings/nav-list-settings';

interface Props {
	type?: string
	items: {
		[key: string]: {
			[key: string]: string;
		}
	}

	userBar: {
		attributes: {
			[key: string]: string
		}
		cogButtonCallback?: () => void
	}
	chooseItem?: (arg: unknown) => void;
}

export default class NavMenu extends Block {
	childBlocks: {
		list: NavList | NavListSettings;
		userBar: UserBar;
	};

	props: Props;

	constructor(props: Props, classList: string, parent = '', tag = 'aside') {
		super(props, tag, parent, template, `nav-menu ${classList}`);
		this._attach();
	}

	componentDidMount(): void {
		const {userBar, chooseItem, items} = this.props;
		this.childBlocks.userBar = new UserBar(userBar);
		if (this.props.type === 'settings') {
			this.childBlocks.list = new NavListSettings({items}, 'nav-menu__list', '.nav-menu__scrollable');
		}
		if (this.props.type === 'chats') {
			this.childBlocks.list = new NavList({
				items,
				callback: chooseItem,
			}, 'nav-menu__list', '.nav-menu__scrollable');
		}
	}

	render(): string {
		const element = this.compile(this.template);
		return element({listContainer: 'nav-menu__scrollable'});
	}
}
