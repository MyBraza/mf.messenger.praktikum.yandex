import Block from "../block.js";
import template from "./template.js";
import NavSearch from "../nav-search/nav-search.js";
import ChatFeedHeader from "../chat-feed-header/chat-feed-header.js";
import ChooseChat from "../choose-chat/choose-chat.js";
import NavMenu from "../nav-menu/nav-menu.js";
import ChatFeed from "../chat-feed/chat-feed.js";
import Router from "../../utils/router.js";

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
	userBar: {
		[key: string]: string
	}
	chooseChat: {
		[key: string]: string
	}
	render?: {
		[key: string]: string
	}
	currentChat?: string;

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
		[key: string]: Block;
	};
	_currentChat: string;

	constructor(props: Props, classList: string = 'grid', parent: string = 'body',) {
		super(props, 'div', parent, template, classList);
		this._attach();
		this.showChatFeed();
	}

	showChooseChat() {
		this.childBlocks.chatFeed.hide();
		this.childBlocks.chooseChat.show();
	}

	openChat = (id: string = 'none') => {
		this._currentChat = id;
		this.childBlocks.feedHeader.setProps({contact: this.props.contacts[this._currentChat],});
		this.childBlocks.chatFeed.setProps({currentChat: this._currentChat,});
		this.showChatFeed();
	};

	showChatFeed() {
		this.showChooseChat();
		if (this.props.contacts[this._currentChat]) {
			this.childBlocks.chooseChat.hide();
			this.childBlocks.chatFeed.show();
		}
	}

	componentDidMount() {
		const {currentChat, search, contacts, chooseChat, userBar, chatsList, messageInput} = this.props;
		this._currentChat = currentChat ? currentChat : '';
		this.childBlocks.searchInput = new NavSearch(search, 'grid__nav-head');
		this.childBlocks.feedHeader = new ChatFeedHeader({contact: contacts[this._currentChat]}, 'grid__content-head');
		this.childBlocks.chooseChat = new ChooseChat(chooseChat, 'grid__content chat-feed');
		this.childBlocks.navMenu = new NavMenu({
			list: {items: contacts},
			userBar: {
				render: userBar,
				cogButtonCallback: () => {
					Router.getInstance().go('/settings')
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
				this.showChooseChat();
			},
		}, 'grid__content');
	}

	render(): string {
		let page = this.compile(template);
		return page({});
	}
}
