import Block from "../block.js";
import template from "./template.js";
//import formInput from "../form-input/form-input.js";
//import formButton from "../button/form-button.js";
import formItemsHelper from "../../js/formItemsHelper.js";
import navSearch from "../nav-search/nav-search.js";
import chatFeedHeader from "../chat-feed-header/chat-feed-header.js";
import chooseChat from "../choose-chat/choose-chat.js";
import navMenu from "../nav-menu/nav-menu.js";
import chatFeed from "../chat-feed/chat-feed.js";
import settingsHead from "../settings-nav-header/settings-nav-header.js";
import profileSettings from "../profile-settings/profile-settings.js";

formItemsHelper();

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

export default class grid extends Block {
	props: Props;
	childBlocks: {
		searchInput: navSearch;
		feedHeader: chatFeedHeader;
		chooseChat: chooseChat;
		navMenu: navMenu;
		settingsMenu: navMenu;
		chatFeed: chatFeed;
		settingsMenuHeader: settingsHead;
		profileSettings: profileSettings;
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
		this._currentChat = this.props.currentChat ? this.props.currentChat : '';
		this.childBlocks.searchInput = new navSearch(this.props.search, 'grid__nav-head');
		this.childBlocks.settingsMenuHeader = new settingsHead({
			render: this.props.settingsHead,
			returnCallback: this.showChatFeed.bind(this)
		}, 'grid__nav-head');
		this.childBlocks.feedHeader = new chatFeedHeader({contact: this.props.contacts[this._currentChat]}, 'grid__content-head');
		this.childBlocks.chooseChat = new chooseChat(this.props.chooseChat, 'grid__content chat-feed');
		this.childBlocks.navMenu = new navMenu({
			list: {items: this.props.contacts},
			userBar: {render: this.props.userBar, cogButtonCallback: this.showSettings.bind(this)},
			chooseItem: (element: HTMLElement) => {
				const id = element.dataset.id;
				console.log(id);
				this.openChat.bind(this)(id)
			},
		}, 'grid__nav state_chats');
		this.childBlocks.chatFeed = new chatFeed({
			list: this.props.chatsList,
			messageInput: this.props.messageInput,
			contacts: this.props.contacts,
			user: this.props.userBar,
			currentChat: this._currentChat,
			noCurrentChat: this.showChooseChat.bind(this)
		}, 'grid__content');
		this.childBlocks.settingsMenu = new navMenu({
			list: {items: this.props.settings, type: 'settings'},
			userBar: {render: this.props.userBar, cogButtonCallback: this.showSettings.bind(this)}
		}, 'grid__nav state_settings');
		this.childBlocks.profileSettings = new profileSettings({
			elements: this.props.userSettings,
			onSubmit: this.showChooseChat.bind(this),
			onCancel: this.showChooseChat.bind(this),
		}, 'grid__content')
	}

	render(): string {
		let page = this.compile(template);
		return page({});
	}
}
