import Block from "../block";
import template from "./template";
import UserItem from "../user-item/user-item";

interface Props {
	items?: {
		[key: string]: {
			[key: string]: string
		}
	}
	actionType?: string;
	search?: (arg: unknown) => void;
	deleteUser?: (arg: unknown) => void;
	addUser?: (arg: unknown) => void;
}

export default class UsersList extends Block {
	props: Props;

	constructor(props: Props, classList: string = '', parent: string = '', tag: string = 'ul') {
		super(props, tag, parent, template, `users-list ${classList}`);
	}

	componentDidRender() {
		this.childBlocks = {};
		const {actionType, deleteUser, addUser} = this.props;
		const callback = actionType === 'add' ? addUser : deleteUser;
		for (let key in this.props.items) {
			if (this.props.items.hasOwnProperty(key)) {
				this.childBlocks[key] = new UserItem({...this.props.items[key], action: callback});
			}
		}
		const search = this._element?.querySelector('#user-list-action-search');
		search?.addEventListener('click', () => {
			const input = <HTMLInputElement>this._element?.querySelector('#user-list-search');
			if (this.props.search) {
				this.props.search(input.value);
			}
		});
		this._attach();
	}

	render(): string {
		let element = this.compile(this.template);
		return element({});
	}
}