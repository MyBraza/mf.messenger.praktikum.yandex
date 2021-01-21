class EventBus {
	listeners: { [key: string]: Array<(...args: Array<unknown>) => void> };

	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: (...args: Array<unknown>) => void): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: string, callback: (...args: Array<unknown>) => void): void {
		if (!this.exists(event, callback)) {
			return;
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback,
		);
	}

	exists(event: string, callback: (...args: Array<unknown>) => void): boolean {
		if (this.listeners[event]) {
			return this.listeners[event].includes(callback);
		}
		return false;
	}

	emit(event: string, ...args: Array<unknown>): void {
		if (!this.listeners[event]) {
			return;
		}

		this.listeners[event].forEach((listener: (...args: Array<unknown>) => void) => {
			listener(...args);
		});
	}
}

export default EventBus;
