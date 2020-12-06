import Block from "../block.js";
import template from "./template.js";
export default class settingsHead extends Block {
    constructor(props, classList, parent = '') {
        super('div', props, parent, template, `nav-search ${classList}`);
    }
    componentDidMount() {
        var _a;
        const returnCallback = this.props.returnCallback ? this.props.returnCallback : () => {
            console.log('click on cog button');
        };
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', event => {
            event.preventDefault();
            const returnIcon = this.props.render.returnIcon ? this.props.render.returnIcon : 'icon';
            if (event.target.classList.contains(returnIcon))
                returnCallback();
        });
    }
    render() {
        let element = this.compile(this.template);
        return element(this.props.render);
    }
}
//# sourceMappingURL=settings-nav-header.js.map