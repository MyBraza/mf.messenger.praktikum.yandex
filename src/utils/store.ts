import EventBus from 'utils/event-bus';
import cloneDeep from 'utils/clone-deep';
import isEqual from 'utils/is-equal';
import setByPath from 'utils/set-by-path';

interface State {
	[key: string]: unknown
}

class Store {
	private static __instance: Store;

	static EVENTS = {
		FLOW_SDU: 'flow:state-did-update'
	};

	state: State;

	eventBus: EventBus;

	constructor() {
		if (Store.__instance) {
			return Store.__instance;
		}
		this.state = this._proxyState({});
		this.eventBus = new EventBus();
		Store.__instance = this;
	}

	public static getInstance(): Store {
		if (!Store.__instance) {
			Store.__instance = new Store();
		}

		return Store.__instance;
	}

	_proxyState(state: State) {
		return new Proxy(state, {
			get: (target: State, prop: string) => target[prop],
			set: (target: State, prop: string, value: unknown) => {
				if (Object.prototype.toString.call(value) === '[object Object]') {
					if (isEqual(<State>target[prop], value as Record<string, unknown>)) {
						return true;
					}
					target[prop] = cloneDeep(value);
				} else {
					target[prop] = value;
				}
				this.eventBus.emit(`${Store.EVENTS.FLOW_SDU}_${prop}`, target[prop]);
				return true;
			},
			deleteProperty: () => {
				throw new Error('нет доступа');
			},
		});
	}

	get = (prop: string) => this.state[prop];

	setState = (newState: unknown, path: string | undefined = undefined) => {
		setByPath(this.state, newState, path);
	};

	subscribe(callback: (...args: Array<unknown>) => void, prop = '') {
		if (!this.eventBus.exists(`${Store.EVENTS.FLOW_SDU}_${prop}`, callback)) {
			this.eventBus.on(`${Store.EVENTS.FLOW_SDU}_${prop}`, callback);
			callback(this.state[prop]);
		}
	}
}

const store = new Store();

export default store;
