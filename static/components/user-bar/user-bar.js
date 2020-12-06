import Block from "../block.js";
import template from "./template.js";
export default class userBar extends Block {
    constructor(props, classList = '', parent = '') {
        super('div', props, parent, template, `user-bar ${classList}`);
    }
    componentDidMount() {
        var _a;
        const cogButtonCallback = this.props.cogButtonCallback ? this.props.cogButtonCallback : () => {
            console.log('click on cog button');
        };
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', event => {
            event.preventDefault();
            const settingsIcon = this.props.render.settingsIcon ? this.props.render.settingsIcon : 'icon';
            if (event.target.classList.contains(settingsIcon))
                cogButtonCallback();
        });
    }
    render() {
        let element = this.compile(this.template);
        return element(this.props.render);
    }
}
//# sourceMappingURL=user-bar.js.map