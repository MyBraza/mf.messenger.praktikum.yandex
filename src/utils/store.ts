import EventBus from "./event-bus";
import cloneDeep from "./clone-deep";
import isEqual from "./is-equal";
import setByPath from "./set-by-path";

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
			Store.__instance = new Store;
		}

		return Store.__instance;
	}

	_proxyState(state: State) {
		const self = this;
		return new Proxy(state, {
			get(target: State, prop: string) {
				return target[prop];
			},
			set(target: State, prop: string, value: any) {
				if (Object.prototype.toString.call(value) === '[object Object]') {
					if (isEqual(<State>target[prop], value)) {
						return true;
					}
					target[prop] = cloneDeep(value);
				} else {
					target[prop] = value;
				}
				self.eventBus.emit(`${Store.EVENTS.FLOW_SDU}_${prop}`, target[prop]);
				return true
			},
			deleteProperty() {
				throw new Error('нет доступа');
			},
		});
	}

	get = (prop: string) => {
		return this.state[prop]
	};

	setState = (newState: { [key: string]: unknown }, path: string | undefined = undefined) => {
		setByPath(this.state, newState, path);
	};

	subscribe(callback: (...args: Array<unknown>) => void, prop: string = '') {
		if (!this.eventBus.exists(`${Store.EVENTS.FLOW_SDU}_${prop}`, callback)) {
			this.eventBus.on(`${Store.EVENTS.FLOW_SDU}_${prop}`, callback);
			callback(this.state[prop]);
		}
	}

	unsubscribe(callback: (...args: Array<unknown>) => void, prop: string = '') {
		this.eventBus.off(`${Store.EVENTS.FLOW_SDU}_${prop}`, callback);
	}

}

const store = new Store;

export default store