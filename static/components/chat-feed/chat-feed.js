import Block from "../block.js";
import template from "./template.js";
import messageInput from "../message-input/message-input.js";
import message from "../message/message.js";
export default class chatFeed extends Block {
    constructor(props, classList = '', parent = '', tag = 'main') {
        super(tag, props, parent, template, `chat-feed ${classList}`);
    }
    componentDidMount() {
        this.message = new message({});
        this.messageInput = new messageInput(this.props.messageInput);
    }
    render() {
        var _a;
        let messagesRender = '';
        (_a = this.props.list[this.props.currentChat]) === null || _a === void 0 ? void 0 : _a.forEach(function (message) {
            const sender = message.sender === 'user' ? this.props.user : this.props.contacts[message.sender];
            this.message.setProps({
                userImg: sender.imgURL,
                displayName: sender.displayName,
                date: message.date,
                contentText: message.contentText
            });
            messagesRender += this.message.getContent();
        }, this);
        this.setProps({
            render: {
                messageInputRender: this.messageInput.getContent(),
                messages: messagesRender,
            }
        });
        let element = this.compile(this.template);
        return element(this.props.render);
    }
}
//# sourceMappingURL=chat-feed.js.map