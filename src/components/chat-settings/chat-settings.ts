import Block from "../block.js";
import template from "./template.js";
import FormInputImage from "../form-input-image/form-input-image";
import FormInput from "../form-input/form-input";
import UsersList from "../users-list/users-list";
import ChatsController from "../../utils/chats-controller";
import store from "../../utils/store.js";
import FormButton from "../button/form-button";

interface Props {

	chat: { [key: string]: string };

	[key: string]: unknown
}

export default class ChatSettings extends Block {
	props: Props;
	controller: ChatsController;

	constructor(props: Props, classList: string, parent = '') {
		super(props, 'main', parent, template, `chat-settings ${classList}`);
		store.subscribe(this.searchSubscriber, 'found-users');
		store.subscribe(this.subscriber, 'chat-users');
	};

	subscriber = (users: Array<{ [key: string]: string }>) => {
		let items: { [key: string]: { [key: string]: string } } = {};
		users?.forEach(value => items[value.id] = {...value, icon: 'icon-logout'});
		this.childBlocks.usersList.setProps({items, actionType: 'delete'});
	};

	searchSubscriber = (users: Array<{ [key: string]: string }>) => {
		if (users?.length === 0) {
			users[0] = {login: 'not found', avatar: '/img/not-found.jpg'};
		}
		let items: { [key: string]: { [key: string]: string } } = {};
		users?.forEach(value => items[value.id] = {...value, icon: 'icon-plus-circled'});
		this.childBlocks.usersList.setProps({items, actionType: 'add'});
	};

	componentDidRender() {
		this.childBlocks.avatar.setProps({value: this.props.chat.avatar});
		this.childBlocks.title.setProps({value: this.props.chat.title});
		this._attach();
	}

	componentDidMount() {
		this.controller = new ChatsController();
		this.childBlocks.avatar = new FormInputImage({}, '');
		this.childBlocks.title = new FormInput({
			type: 'text',
			placeholder: 'введите название чата',
			id: 'title'
		}, '', 'form');
		this.childBlocks.button = new FormButton({
			attributes: {
				"type": "submit",
				"data-form-name": "profile-info",
				"class": "form-button_empty",
				"id": "submit-button",
			},
			text: "Сохранить"
		}, 'chat-settings__button', 'form');
		this.childBlocks.usersList = new UsersList({
			deleteUser: (id: string) => {
				this.controller.deleteUser(id, this.props.chat.id)
			},
			addUser: (id: string) => {
				this.controller.addUser(id, this.props.chat.id)
			},
			search: (login: string) => {
				if (login) {
					this.controller.searchUser(login);
				} else if (this.props.chat.id) {
					this.controller.getUsers(this.props.chat.id);
				}
			}
		}, '', '.chat-settings__scrollable');
	}

	show() {
		super.show();
		if (this.props.chat.id) {
			this.controller.getUsers(this.props.chat.id);
		}
	}

	render(): string {
		let form = this.compile(template);
		return form(this.props);
	}
}