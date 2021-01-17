import Block from "../../components/block";
import template from "./template";
import NavSearch from "../../components/nav-search/nav-search";
import ChatFeedHeader from "../../components/chat-feed-header/chat-feed-header";
import ChooseChat from "../../components/choose-chat/choose-chat";
import NavMenu from "../../components/nav-menu/nav-menu";
import ChatFeed from "../../components/chat-feed/chat-feed";
import Router from "../../utils/router";
import ChatsController from "../../utils/chats-controller";
import paths from "../../utils/paths";
import store from "../../utils/store";
import ChatSettings from "../../components/chat-settings/chat-settings";

interface Props {
	search: {
		id: string;
		icon: string;
		placeholder: string;
		value?: string;
	}
	messageInput: {
		[key: string]: string;
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

	[key: string]: unknown
}

export default class Chats extends Block {
	props: Props;
	childBlocks: {
		searchInput: NavSearch;
		feedHeader: ChatFeedHeader;
		chooseChat: ChooseChat;
		navMenu: NavMenu;
		chatFeed: ChatFeed;
		chatSettings: ChatSettings;
		[key: string]: Block;
	};
	controller: ChatsController;
	_currentChatId: string | undefined;

	constructor(props: Props, classList: string = 'grid', parent: string = 'body',) {
		super(props, 'div', parent, template, classList);
		this.showChatFeed();
		store.subscribe(this.currentChatSubscriber, 'chats');
	}

	currentChatSubscriber = (chats: Array<{ [key: string]: string }>) => {
		const chat = chats?.find(value => value.id === this._currentChatId);
		if (chat) {
			this.childBlocks.feedHeader.setProps({chat});
			this.childBlocks.chatFeed.setProps({chat});
		} else {
			this._currentChatId = undefined;
			this.showChooseChat();
		}
	};

	showChooseChat() {
		this.childBlocks.chatSettings.hide();
		this.childBlocks.chatFeed.hide();
		this.childBlocks.chooseChat.show();
	}

	openChat = (chat: { [key: string]: string }) => {
		this._currentChatId = chat.id;
		if (chat.id) {
			this.controller.getUsers(chat.id);
		}
		this.childBlocks.feedHeader.setProps({chat});
		this.childBlocks.chatSettings.setProps({chat});
		this.controller.initChat(this._currentChatId);
		this.showChatFeed();
	};

	showChatFeed() {
		this.showChooseChat();
		if (!!this._currentChatId) {
			this.childBlocks.chooseChat.hide();
			this.childBlocks.chatFeed.show();
		}
	}

	showChatSettings() {
		this.showChooseChat();
		if (!!this._currentChatId) {
			this.childBlocks.chooseChat.hide();
			this.childBlocks.chatSettings.show();
		}
	}

	componentDidRender() {
		this._attach();
	}

	componentDidMount() {
		const {search, chooseChat, userBar, messageInput} = this.props;
		this.controller = new ChatsController;
		this.childBlocks.chatSettings = new ChatSettings({chat: {}}, '');
		this.childBlocks.searchInput = new NavSearch(search, 'grid__nav-head');
		this.childBlocks.feedHeader = new ChatFeedHeader({
			chat: {}, onMenuIcon: () => {
				this.showChatSettings();
			}
		}, 'grid__content-head');
		this.childBlocks.chooseChat = new ChooseChat(chooseChat, 'grid__content chat-feed');
		this.childBlocks.navMenu = new NavMenu({
			type: 'chats',
			items: {},
			userBar: {
				attributes: userBar,
				cogButtonCallback: () => {
					Router.getInstance().go(paths.settings)
				}
			},
			chooseItem: (chat: { [key: string]: string }) => {
				this.openChat(chat);
			},
		}, 'grid__nav state_chats');
		this.childBlocks.chatFeed = new ChatFeed({
			messageInput: messageInput,
			chat: {},
			user: userBar,
			noCurrentChat: () => {
				this.showChooseChat();
			},
		}, 'grid__content');
	}

	show() {
		super.show();
		this.controller.getPageData();
		this.showChatFeed();
	}

	render(): string {
		let page = this.compile(template);
		return page({});
	}
}
