import Block from 'components/block';
import ChatsController from 'utils/chats-controller';
import store from 'utils/store';
import template from './template';
import FormInputImage from '../form-input-image/form-input-image';
import FormInput from '../form-input/form-input';
import UsersList from '../users-list/users-list';
import FormButton from '../button/form-button';

interface Props {

	chat: { [key: string]: string };

	[key: string]: unknown
}

export default class ChatSettings extends Block {
	props: Props;

	childBlocks: {
		avatar: FormInputImage,
		[key: string]: Block,
	};

	controller: ChatsController;

	constructor(props: Props, classList: string, parent = '') {
		super(props, 'main', parent, template, `chat-settings ${classList}`);
		store.subscribe(this.searchSubscriber, 'found-users');
		store.subscribe(this.subscriber, 'chat-users');
	}

	subscriber = (users: Array<{ [key: string]: string }>): void => {
		const items: { [key: string]: { [key: string]: string } } = {};
		users?.forEach((value) => items[value.id] = {...value, icon: 'icon-logout'});
		this.childBlocks.usersList.setProps({items, actionType: 'delete'});
	};

	searchSubscriber = (users: Array<{ [key: string]: string }>): void => {
		if (users?.length === 0) {
			users[0] = {login: 'not found', avatar: '/img/not-found.jpg'};
		}
		const items: { [key: string]: { [key: string]: string } } = {};
		users?.forEach((value) => items[value.id] = {...value, icon: 'icon-plus-circled'});
		this.childBlocks.usersList.setProps({items, actionType: 'add'});
	};

	componentDidMount(): void {
		this.controller = new ChatsController();
		this.childBlocks.avatar = new FormInputImage({}, '');
		this.childBlocks.title = new FormInput({
			type: 'text',
			placeholder: 'введите название чата',
			id: 'title',
		}, '', 'form');
		this.childBlocks.button = new FormButton({
			attributes: {
				type: 'submit',
				'data-form-name': 'profile-info',
				class: 'form-button_empty',
				id: 'submit-button',
			},
			text: 'Сохранить',
		}, 'chat-settings__button', 'form');
		this.childBlocks.usersList = new UsersList({
			deleteUser: (id: string) => {
				this.controller.deleteUser(id, this.props.chat.id);
			},
			addUser: (id: string) => {
				this.controller.addUser(id, this.props.chat.id);
			},
			search: (login: string) => {
				if (login) {
					this.controller.searchUser(login);
				} else if (this.props.chat.id) {
					this.controller.getUsers(this.props.chat.id);
				}
			},
		}, '', '.chat-settings__scrollable');
	}

	_addEventListeners(): void {
		const onSubmit = (event: Event): void => {
			event.preventDefault();
			let flag = true;
			const item = this.childBlocks.title;
			if (item instanceof FormInput) {
				const result = item.validator();
				flag = result ? flag : result;
			}
			const form = event.target as HTMLFormElement;
			if (flag) {
				const formData = new FormData(form);
				const avatar = this.childBlocks.avatar.input;
				if (avatar.files) formData.append('avatar', avatar.files[0]);
				this.controller.updateChatAvatar(this.props.chat.id, formData);
				avatar.value = '';
			}
		};

		const form = this._element?.querySelector('form');
		form?.addEventListener('submit', onSubmit);
	}

	componentDidRender(): void {
		let {avatar} = this.props.chat;
		avatar = avatar ? `https://ya-praktikum.tech/${avatar}` : 'img/placeholder.jpg';
		this.childBlocks.avatar.setProps({value: avatar});
		this.childBlocks.title.setProps({value: this.props.chat.title});
		this._addEventListeners();
		this._attach();
	}

	render(): string {
		const form = this.compile(template);
		return form(this.props);
	}
}
