import EventBus from "../utils/event-bus";
import setByPath from "../utils/set-by-path";
import isEqual from "../utils/is-equal";
import cloneDeep from "../utils/clone-deep";

class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_RENDER: 'flow:render',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_CDR: 'flow:component-did-render'
	};

	_element: HTMLElement | null;
	_meta: {
		tagName: string;
		classList: string;
		props: {}
	};
	childBlocks: {
		[key: string]: Block
	};

	parent: string;
	props: {
		[key: string]: unknown
	} | unknown;
	eventBus: EventBus;
	compile = Handlebars.compile;
	template: string;

	constructor(
		props = {},
		tagName = 'div',
		parent: string = 'body',
		template: string = '',
		classList = ''
	) {
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

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDR, this._componentDidRender.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
	}

	_createResources() {
		const {tagName} = this._meta;
		const {classList} = this._meta;
		this._element = this._createDocumentElement(tagName);
		if (!!classList) {
			const classNames = classList.split(' ').filter(item => item !== '');
			this._element.classList.add(...classNames);
		}
	}

	subscriber(data: unknown) {
		throw new Error(`Method not implemented\nData=${data}`);
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

	_componentDidUpdate() {
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
	}

	get element() {
		if (this._element !== null) {
			return this._element;
		}
	}

	_detach() {
		for (let key in this.childBlocks) {
			let root;
			if (this.childBlocks[key].parent !== '')
				root = this._element?.querySelector(this.childBlocks[key].parent);
			root = root || this._element;
			let block = this.childBlocks[key];
			let el = block.getElement();
			if (el !== undefined && root !== null) {
				root?.removeChild(el);
			}
		}
	}

	_attach() {
		for (let key in this.childBlocks) {
			let root;
			if (this.childBlocks[key].parent !== '')
				root = this._element?.querySelector(this.childBlocks[key].parent);
			root = root || this._element;
			let block = this.childBlocks[key];
			let el = block.getElement();
			if (el !== undefined && root !== null) {
				root?.appendChild(el);
			}
		}
	}

	_render() {
		const render: string = this.render();
		if (this._element !== null) {
			this._element.innerHTML = render;
			this.eventBus.emit(Block.EVENTS.FLOW_CDR);
		}
	}

	_componentDidRender() {
		this.componentDidRender();
	}

	componentDidRender() {
	}

	render(): string {
		return '';
	}

	getContent() {
		return this.element ? this.element.outerHTML : '';
	}

	getElement() {
		return this.element;
	}

	setProps = (nextProps: unknown, path: string | undefined = undefined) => {
		setByPath(<{ [key: string]: unknown }>this.props, nextProps, path);
	};

	_makePropsProxy(props: {}) {
		return new Proxy(props, {
			get: (target: { [key: string]: unknown }, prop: string) => {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target: { [key: string]: any }, prop: string, value: any) => {
				if (Object.prototype.toString.call(value) === '[object Object]') {
					if (isEqual(target[prop], value)) {
						return true;
					}
					target[prop] = cloneDeep(value);
				} else {
					target[prop] = value;
				}
				this.eventBus.emit(Block.EVENTS.FLOW_CDU, target[prop]);
				return true;
			},
			deleteProperty: () => {
				throw new Error('нет доступа');
			},
		});
	}

	_createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show() {
		const el = this._element;
		if (!!el) {
			el.style.display = '';
		}
		for (let block in this.childBlocks) {
			this.childBlocks[block].show();
		}
	}

	hide() {
		const el = this._element;
		if (!!el) {
			el.style.display = 'none';
		}
		for (let block in this.childBlocks) {
			this.childBlocks[block].hide();
		}
	}
}

export default Block;