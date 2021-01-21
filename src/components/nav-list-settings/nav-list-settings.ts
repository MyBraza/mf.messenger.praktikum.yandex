import Block from 'components/block';
import template from './template';
import settingsItem from '../settings-item/settings-item';

interface Props {
	items: {
		[key: string]: {
			[key: string]: string
		}
	}
}

export default class NavListSettings extends Block {
	props: Props;

	constructor(props: Props, classList = '', parent = '', tag = 'ul') {
		super(props, tag, parent, template, `nav-list-settings ${classList}`);
		this._attach();
	}

	componentDidRender(): void {
		const {items} = this.props;
		for (const key in items) {
			this.childBlocks[key] = new settingsItem(items[key]);
		}
		this._attach();
	}

	render(): string {
		const page = this.compile(template);
		return page({});
	}
}
