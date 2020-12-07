import Block from "../block.js";
import template from "./template.js";
import arrangeFormInputsHelper from "../../script/formItemsHelper.js";
import NavSearch from "../nav-search/nav-search.js";
import ChatFeedHeader from "../chat-feed-header/chat-feed-header.js";
import ChooseChat from "../choose-chat/choose-chat.js";
import NavMenu from "../nav-menu/nav-menu.js";
import ChatFeed from "../chat-feed/chat-feed.js";
import SettingsHead from "../settings-nav-header/settings-nav-header.js";
import ProfileSettings from "../profile-settings/profile-settings.js";

arrangeFormInputsHelper();

interface Button {
	attributes: { [key: string]: string };
	text: string;
}

interface Settings {
	settingsFormInputs: { [key: string]: { [key: string]: string } };
	submitButton: Button;
	cancelButton: Button;
	onSubmit?: () => void;

	[key: string]: unknown;
}

interface Props {
	search: {
		id: string;
		icon: string;
		placeholder: string;
		value?: string;
	}
	chatsList: {
		[key: string]: Array<{ [key: string]: string }>
	}
	messageInput: {
		[key: string]: string;
	}
	contacts: {
		[key: string]: { [key: string]: string }
	}
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
	chooseChat: {
		[key: string]: string
	}
	render?: {
		[key: string]: string
	}
	userSettings: Settings;
	currentMenu?: string;
	currentChat?: string;

	[key: string]: unknown
}

export default class Grid extends Block {
	props: Props;
	childBlocks: {
		searchInput: NavSearch;
		feedHeader: ChatFeedHeader;
		chooseChat: ChooseChat;
		navMenu: NavMenu;
		settingsMenu: NavMenu;
		chatFeed: ChatFeed;
		settingsMenuHeader: SettingsHead;
		profileSettings: ProfileSettings;
		[key: string]: Block;
	};
	_currentChat: string;

	constructor(props: Props, classList: string = 'grid', parent: string = 'body',) {
		super('div', props, parent, template, classList);
		this._attach();
		this.showChatFeed();
	}

	showChooseChat() {
		for (let k in this.childBlocks) {
			this.childBlocks[k].hide();
		}
		this._element?.classList.add('grid');
		this._element?.classList.remove('grid_settings');
		this.childBlocks.navMenu.show();
		this.childBlocks.searchInput.show();
		this.childBlocks.feedHeader.show();
		this.childBlocks.chooseChat.show();
	}

	openChat(id: string = 'none') {
		this._currentChat = id;
		this.childBlocks.feedHeader.setProps({contact: this.props.contacts[this._currentChat],});
		this.childBlocks.chatFeed.setProps({currentChat: this._currentChat,});
		this.showChatFeed();
	}

	showChatFeed() {
		this.showChooseChat();
		debugger
		if (this.props.contacts[this._currentChat]) {
			this.childBlocks.chooseChat.hide();
			this.childBlocks.chatFeed.show();
		}
	}

	showSettings() {
		for (let k in this.childBlocks) {
			this.childBlocks[k].hide();
		}
		this._element?.classList.remove('grid');
		this._element?.classList.add('grid_settings');
		this.childBlocks.settingsMenu.show();
		this.childBlocks.settingsMenuHeader.show();
		this.childBlocks.profileSettings.show();
	}

	componentDidMount() {
		const {currentChat, search, contacts, settingsHead, chooseChat, userBar, chatsList, messageInput, settings, userSettings} = this.props;
		this._currentChat = currentChat ? currentChat : '';
		this.childBlocks.searchInput = new NavSearch(search, 'grid__nav-head');
		this.childBlocks.settingsMenuHeader = new SettingsHead({
			render: settingsHead,
			returnCallback: () => {
				this.openChat('none')
			}
		}, 'grid__nav-head');
		this.childBlocks.feedHeader = new ChatFeedHeader({contact: contacts[this._currentChat]}, 'grid__content-head');
		this.childBlocks.chooseChat = new ChooseChat(chooseChat, 'grid__content chat-feed');
		this.childBlocks.navMenu = new NavMenu({
			list: {items: contacts},
			userBar: {
				render: userBar, cogButtonCallback: () => {
					this.showSettings()
				}
			},
			chooseItem: (element: HTMLElement) => {
				const id = element.dataset.id;
				console.log(id);
				this.openChat(id);
			},
		}, 'grid__nav state_chats');
		this.childBlocks.chatFeed = new ChatFeed({
			list: chatsList,
			messageInput: messageInput,
			contacts: contacts,
			user: userBar,
			currentChat: this._currentChat,
			noCurrentChat: () => {
				this.openChat('none')
			}
		}, 'grid__content');
		this.childBlocks.settingsMenu = new NavMenu({
			list: {items: settings, type: 'settings'},
			userBar: {
				render: userBar, cogButtonCallback: () => {
					this.showSettings()
				}
			}
		}, 'grid__nav state_settings');
		this.childBlocks.profileSettings = new ProfileSettings({
			elements: userSettings,
			onSubmit: () => {
				this.openChat('none')
			},
			onCancel: () => {
				this.openChat('none')
			},
		}, 'grid__content')
	}

	render(): string {
		let page = this.compile(template);
		return page({});
	}
}
