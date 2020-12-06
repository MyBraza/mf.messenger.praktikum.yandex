import Block from "../block.js";
import template from "./template.js";
import chatItem from "../chat-item/chat-item.js";

interface Props {
    contact: {
        [key: string] : string,
    }
    render?: {
        [key: string] : string,
    }
    [key: string] : unknown
}

export default class chatFeedHeader extends Block{
    contact: chatItem;
    props: Props;
    constructor(props: Props, classList: string,parent: string = '',) {
        super('div', props, parent, template, `chat-feed-header ${classList}`);
    }

    componentDidMount() {
        this.contact = new chatItem(this.props.contact, 'currentContact', 'chat-item_static');
    }

    render(): string {
        this.contact.setProps(this.props.contact);
        let element = this.compile(this.template);
        return element({contact: this.contact.getContent()});
    }
}