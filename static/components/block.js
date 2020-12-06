import EventBus from './event-bus.js';
class Block {
    constructor(tagName = "div", props = {}, parent, template, classList = '') {
        this.compile = Handlebars.compile;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        this.eventBus = new EventBus();
        this._meta = {
            tagName,
            classList,
            props
        };
        this.parent = parent;
        this.template = template;
        this.childBlocks = {};
        this.props = this._makePropsProxy(props);
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        const { tagName } = this._meta;
        const { classList } = this._meta;
        this._element = this._createDocumentElement(tagName);
        if (classList !== '' && classList !== undefined && classList !== null) {
            const classNames = classList.split(' ').filter(item => item !== '');
            this._element.classList.add(...classNames);
        }
    }
    init() {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return JSON.stringify(oldProps) !== JSON.stringify(newProps);
    }
    get element() {
        if (this._element !== null) {
            return this._element;
        }
    }
    _attach() {
        var _a;
        for (let key in this.childBlocks) {
            let root;
            if (this.childBlocks[key].parent !== '')
                root = (_a = this._element) === null || _a === void 0 ? void 0 : _a.querySelector(this.childBlocks[key].parent);
            root = root ? root : this._element;
            let block = this.childBlocks[key];
            let el = block.getElement();
            if (el !== undefined && root !== null) {
                root === null || root === void 0 ? void 0 : root.appendChild(el);
            }
        }
    }
    _render() {
        const render = this.render();
        if (this._element !== null) {
            this._element.innerHTML = render;
        }
    }
    // Может переопределять пользователь, необязательно трогать
    render() {
        return '';
    }
    getContent() {
        return this.element ? this.element.outerHTML : '';
    }
    getElement() {
        return this.element;
    }
    _makePropsProxy(props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                let oldProp;
                if (Object.prototype.toString.call(target[prop]) === '[object Object]') {
                    oldProp = Object.assign({}, target[prop]);
                }
                else {
                    oldProp = target[prop];
                }
                if (Object.prototype.toString.call(value) === '[object Object]') {
                    target[prop] = Object.assign({}, value);
                }
                else {
                    target[prop] = value;
                }
                self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProp, target[prop]);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
    }
    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    show() {
        const el = this.getElement();
        if (el !== undefined) {
            el.style.display = "";
        }
    }
    hide() {
        const el = this.getElement();
        if (el !== undefined) {
            el.style.display = "none";
        }
    }
}
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
};
export default Block;
//# sourceMappingURL=block.js.map