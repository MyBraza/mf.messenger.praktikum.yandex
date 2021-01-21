import Block from 'components/block';
import NavSearch from 'components/nav-search/nav-search';
import ChatFeedHeader from 'components/chat-feed-header/chat-feed-header';
import ChooseChat from 'components/choose-chat/choose-chat';
import NavMenu from 'components/nav-menu/nav-menu';
import ChatFeed from 'components/chat-feed/chat-feed';
import Router from 'utils/router';
import ChatsController from 'utils/chats-controller';
import paths from 'utils/paths';
import store from 'utils/store';
import ChatSettings from 'components/chat-settings/chat-settings';
import template from './template';

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

	constructor(props: Props, classList = 'grid', parent = 'body') {
		super(props, 'div', parent, template, classList);
		this.showChatFeed();
		store.subscribe(this.currentChatSubscriber, 'chats');
	}

	currentChatSubscriber = (chats: Array<{ [key: string]: string }>): void => {
		const chat = chats?.find((value) => value.id === this._currentChatId);
		if (chat) {
			this.childBlocks.feedHeader.setProps({chat});
			this.childBlocks.chatFeed.setProps({chat});
		} else {
			this._currentChatId = undefined;
			this.showChooseChat();
		}
	};

	showChooseChat(): void {
		this.childBlocks.chatSettings.hide();
		this.childBlocks.chatFeed.hide();
		this.childBlocks.chooseChat.show();
	}

	openChat = (chat: { [key: string]: string }): void => {
		this._currentChatId = chat.id;
		if (this._currentChatId) {
			this.controller.getUsers(chat.id);
		}
		this.childBlocks.feedHeader.setProps({chat});
		this.childBlocks.chatSettings.setProps({chat});
		this.controller.initChat(this._currentChatId);
		this.showChatFeed();
	};

	showChatFeed(): void {
		this.showChooseChat();
		if (this._currentChatId) {
			this.childBlocks.chooseChat.hide();
			this.childBlocks.chatFeed.show();
		}
	}

	showChatSettings(): void {
		this.showChooseChat();
		if (this._currentChatId) {
			this.childBlocks.chooseChat.hide();
			this.childBlocks.chatSettings.show();
		}
	}

	componentDidRender(): void {
		this._attach();
	}

	componentDidMount(): void {
		const {
			search, chooseChat, userBar, messageInput,
		} = this.props;
		this.controller = new ChatsController();
		this.childBlocks.chatSettings = new ChatSettings({chat: {}}, '');
		this.childBlocks.searchInput = new NavSearch(search, 'grid__nav-head');
		this.childBlocks.feedHeader = new ChatFeedHeader({
			chat: {},
			onMenuIcon: () => {
				this.showChatSettings();
			},
		}, 'grid__content-head');
		this.childBlocks.chooseChat = new ChooseChat(chooseChat, 'grid__content chat-feed');
		this.childBlocks.navMenu = new NavMenu({
			type: 'chats',
			items: {},
			userBar: {
				attributes: userBar,
				cogButtonCallback: () => {
					Router.getInstance().go(paths.settings);
				},
			},
			chooseItem: (chat: { [key: string]: string }) => {
				this.openChat(chat);
			},
		}, 'grid__nav state_chats');
		this.childBlocks.chatFeed = new ChatFeed({
			messageInput,
			chat: {},
			user: userBar,
			noCurrentChat: () => {
				this.showChooseChat();
			},
		}, 'grid__content');
	}

	show(): void {
		super.show();
		this.controller.getPageData();
		this.showChatFeed();
	}

	render(): string {
		const page = this.compile(template);
		return page({});
	}
}
