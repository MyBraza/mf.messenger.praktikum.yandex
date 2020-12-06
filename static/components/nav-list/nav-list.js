import Block from "../block.js";
import template from "./template.js";
import chatItem from "../chat-item/chat-item.js";
import settingsItem from "../settings-item/settings-item.js";
export default class navList extends Block {
    constructor(props, callback = () => {
    }, classList = '', parent = '', tag = 'ul') {
        var _a;
        super(tag, props, parent, template, `nav-list ${classList}`);
        const items = (_a = this._element) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('li');
        if (items) {
            for (let i = 0; i < (items === null || items === void 0 ? void 0 : items.length); i++) {
                items[i].addEventListener('click', event => {
                    event.preventDefault();
                    const element = event.currentTarget;
                    console.log(element.tagName);
                    callback(element);
                });
            }
        }
    }
    componentDidMount() {
        this.navItems = {};
        for (let k in this.props.items) {
            this.navItems[k] = this.props.type === 'settings' ? new settingsItem(this.props.items[k]) : new chatItem(this.props.items[k], k);
        }
    }
    render() {
        let render = '';
        for (let k in this.props.items) {
            this.navItems[k].setProps(this.props.items[k]);
            render += this.navItems[k].getContent();
        }
        let element = this.compile(this.template);
        return element({ render: render });
    }
}
//# sourceMappingURL=nav-list.js.map