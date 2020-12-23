import Block from "../block.js";
import template from "./template.js";
import arrangeFormInputsHelper from "../../utils/formItemsHelper.js";
import NavMenu from "../nav-menu/nav-menu.js";
import SettingsHead from "../settings-nav-header/settings-nav-header.js";
import ProfileSettings from "../profile-settings/profile-settings.js";
import Router from "../../utils/router.js";

arrangeFormInputsHelper();

interface Button {
	attributes: { [key: string]: string };
	text: string;
}

interface SettingsProps {
	formInputs: { [key: string]: { [key: string]: string } };
	buttons: {
		[key: string]: Button
	}
}

interface Props {
	settingsHead: {
		returnIcon: string;
		[key: string]: string;
	}
	settings: {
		[key: string]: { [key: string]: string }
	}
	userBar: {
		[key: string]: string
	}
	userSettings: SettingsProps;

	[key: string]: unknown
}

export default class Settings extends Block {
	props: Props;
	childBlocks: {
		settingsMenu: NavMenu;
		settingsMenuHeader: SettingsHead;
		profileSettings: ProfileSettings;
		[key: string]: Block;
	};
	_currentChat: string;

	constructor(props: Props, classList: string = 'grid_settings', parent: string = 'body',) {
		super(props, 'div', parent, template, classList);
		this._attach();
	}

	componentDidMount() {
		const {settingsHead, userBar, settings, userSettings} = this.props;
		this.childBlocks.settingsMenuHeader = new SettingsHead({
			render: settingsHead,
			returnCallback: () => {
				Router.getInstance().go('/chats')
			},
		}, 'grid__nav-head');
		this.childBlocks.settingsMenu = new NavMenu({
			list: {items: settings, type: 'settings'},
			userBar: {
				render: userBar,
				cogButtonCallback: () => {
					Router.getInstance().go('/settings')
				}
			}
		}, 'grid__nav state_settings');
		this.childBlocks.profileSettings = new ProfileSettings({
			elements: userSettings,
			onSubmit: () => {
				Router.getInstance().go('/chats')
			},
			onCancel: () => {
				Router.getInstance().go('/chats')
			},
		}, 'grid__content')
	}

	render(): string {
		let page = this.compile(template);
		return page({});
	}
}
