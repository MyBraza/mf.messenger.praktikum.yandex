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
export default class grid extends Block {
    constructor(props, classList = 'grid', parent = 'body') {
        super('div', props, parent, template, classList);
        this._attach();
        this.showChatFeed();
    }
    showChooseChat() {
        var _a, _b;
        for (let k in this.childBlocks) {
            this.childBlocks[k].hide();
        }
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.classList.add('grid');
        (_b = this._element) === null || _b === void 0 ? void 0 : _b.classList.remove('grid_settings');
        this.childBlocks.navMenu.show();
        this.childBlocks.searchInput.show();
        this.childBlocks.feedHeader.show();
        this.childBlocks.chooseChat.show();
    }
    openChat(id = 'none') {
        this._currentChat = id;
        this.childBlocks.feedHeader.setProps({ contact: this.props.contacts[this._currentChat], });
        this.childBlocks.chatFeed.setProps({ currentChat: this._currentChat, });
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
        var _a, _b;
        for (let k in this.childBlocks) {
            this.childBlocks[k].hide();
        }
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.classList.remove('grid');
        (_b = this._element) === null || _b === void 0 ? void 0 : _b.classList.add('grid_settings');
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
        this.childBlocks.feedHeader = new chatFeedHeader({ contact: this.props.contacts[this._currentChat] }, 'grid__content-head');
        this.childBlocks.chooseChat = new chooseChat(this.props.chooseChat, 'grid__content chat-feed');
        this.childBlocks.navMenu = new navMenu({
            list: { items: this.props.contacts },
            userBar: { render: this.props.userBar, cogButtonCallback: this.showSettings.bind(this) },
            chooseItem: (element) => {
                const id = element.dataset.id;
                console.log(id);
                this.openChat.bind(this)(id);
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
            list: { items: this.props.settings, type: 'settings' },
            userBar: { render: this.props.userBar, cogButtonCallback: this.showSettings.bind(this) }
        }, 'grid__nav state_settings');
        this.childBlocks.profileSettings = new profileSettings({
            elements: this.props.userSettings,
            onSubmit: this.showChooseChat.bind(this),
            onCancel: this.showChooseChat.bind(this),
        }, 'grid__content');
    }
    render() {
        let page = this.compile(template);
        return page({});
    }
}
//# sourceMappingURL=grid.js.map