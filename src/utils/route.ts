import Block from "../components/block.js";
import detach from "./detach.js";
import render from "./render.js";

interface Props {
	[key: string]: unknown
}

const isBlock = (object: Block | null): object is Block => {
	return object !== null;
};

class Route {
	_pathname: string;
	_blockClass: typeof Block;
	_block: Block | null;
	_props: Props;
	_rootQuery: string;

	constructor(pathname: string, view: typeof Block, rootQuery:string, props: Props) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
		this._rootQuery = rootQuery;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			detach(this._rootQuery, this._block)
		}
	}

	match(pathname: string) {
		return pathname === this._pathname;
	}

	render() {
		if (!this._block) {
			this._block = new this._blockClass(this._props);
		}
		if (isBlock(this._block)) {
			render(this._rootQuery, this._block);
		}
		return;
	}
}

export default Route