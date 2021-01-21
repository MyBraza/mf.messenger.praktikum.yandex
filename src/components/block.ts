import EventBus from 'utils/event-bus';
import setByPath from 'utils/set-by-path';
import isEqual from 'utils/is-equal';
import cloneDeep from 'utils/clone-deep';
import Handlebars from 'handlebars';

class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_RENDER: 'flow:render',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_CDR: 'flow:component-did-render',
	};

	_element: HTMLElement | null;

	_meta: {
		tagName: string;
		classList: string;
		props: Record<string, unknown>;
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
		parent = 'body',
		template = '',
		classList = '',
	) {
		this.eventBus = new EventBus();
		this._meta = {
			tagName,
			classList,
			props,
		};
		this.parent = parent;
		this.template = template;
		this.childBlocks = {};

		this.props = this._makePropsProxy(props);

		this._registerEvents(this.eventBus);
		this.eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus: EventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDR, this._componentDidRender.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
	}

	_createResources(): void {
		const {tagName} = this._meta;
		const {classList} = this._meta;
		this._element = this._createDocumentElement(tagName);
		if (classList) {
			const classNames = classList.split(' ').filter((item) => item !== '');
			this._element.classList.add(...classNames);
		}
	}

	subscriber(data: unknown): void {
		throw new Error(`Method not implemented\nData=${data}`);
	}

	init(): void {
		this._createResources();
		this.eventBus.emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidMount(): void {
		this.componentDidMount();
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount(): void {
		return;
	}

	_componentDidUpdate(): void {
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
	}

	get element(): HTMLElement | null {
		return this._element;
	}

	_attach(): void {
		for (const key in this.childBlocks) {
			let root;
			if (this.childBlocks[key].parent !== '') {
				root = this._element?.querySelector(this.childBlocks[key].parent);
			}
			root = root || this._element;
			const block = this.childBlocks[key];
			const el = block.getElement();
			if (el && root) {
				root?.appendChild(el);
			}
		}
	}

	_render(): void {
		const render: string = this.render();
		if (this._element !== null) {
			this._element.innerHTML = render;
			this.eventBus.emit(Block.EVENTS.FLOW_CDR);
		}
	}

	_componentDidRender(): void {
		this.componentDidRender();
	}

	componentDidRender(): void {
		return;
	}

	render(): string {
		return '';
	}

	getElement(): Node | null {
		return this.element;
	}

	setProps = (nextProps: unknown, path: string | undefined = undefined): void => {
		setByPath(<{ [key: string]: unknown }>this.props, nextProps, path);
	};

	_makePropsProxy(props: Record<string, unknown>): Record<string, unknown> {
		return new Proxy(cloneDeep(props) as Record<string, unknown>, {
			get: (target: { [key: string]: unknown }, prop: string) => {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target: { [key: string]: unknown }, prop: string, value: unknown) => {
				if (Object.prototype.toString.call(value) === '[object Object]') {
					if (isEqual(target[prop] as Record<string, unknown>, value as Record<string, unknown>)) {
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

	_createDocumentElement(tagName: string): HTMLElement {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show(): void {
		const el = this._element;
		if (el) {
			el.style.display = '';
		}
		for (const block in this.childBlocks) {
			this.childBlocks[block].show();
		}
	}

	hide(): void {
		const el = this._element;
		if (el) {
			el.style.display = 'none';
		}
		for (const block in this.childBlocks) {
			this.childBlocks[block].hide();
		}
	}
}

export default Block;
