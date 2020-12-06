import Block from "../block.js";
import template from "./template.js";
import chatItem from "../chat-item/chat-item.js";
export default class chatFeedHeader extends Block {
    constructor(props, classList, parent = '') {
        super('div', props, parent, template, `chat-feed-header ${classList}`);
    }
    componentDidMount() {
        this.contact = new chatItem(this.props.contact, 'currentContact', 'chat-item_static');
    }
    render() {
        this.contact.setProps(this.props.contact);
        let element = this.compile(this.template);
        return element({ contact: this.contact.getContent() });
    }
}
//# sourceMappingURL=chat-feed-header.js.map