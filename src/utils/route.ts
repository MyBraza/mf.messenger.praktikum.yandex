import Block from 'components/block';
import detach from './detach';
import render from './render';

interface Props {
	[key: string]: unknown
}

const isBlock = (object: Block | null): object is Block => object !== null;

class Route {
	_pathname: string;

	_blockClass: typeof Block;

	_block: Block | null;

	_props: Props;

	_rootQuery: string;

	constructor(pathname: string, view: typeof Block, rootQuery: string, props: Props) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
		this._rootQuery = rootQuery;
	}

	leave(): void {
		if (this._block) {
			this._block.hide();
			detach(this._rootQuery, this._block);
		}
	}

	match(pathname: string): boolean {
		return pathname === this._pathname;
	}

	render(): void {
		if (!this._block) {
			this._block = new this._blockClass(this._props);
		}
		this._block.show();
		if (isBlock(this._block)) {
			render(this._rootQuery, this._block);
		}
	}
}

export default Route;
