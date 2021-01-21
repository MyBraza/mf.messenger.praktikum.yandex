import store from 'utils/store';
import chatsApi from 'api/chats-api';
import userApi from 'api/user-api';
import Router from './router';
import paths from './paths';

export default class ChatsController {
	getPageData = (): void => {
		userApi.request().then((data: { [key: string]: unknown }) => {
			if (!data) return false;
			data.avatar = data.avatar ? `https://ya-praktikum.tech${data.avatar}` : data.avatar;
			store.setState(data, 'userInfo');
			return true;
		}).then((authorized) => {
			if (!authorized) return;
			this.getChats();
		}).catch(() => {
			Router.getInstance().go(paths.authorization);
		});
	};

	getChats = (): void => {
		chatsApi.request().then((data) => {
			if (data) store.setState(data, 'chats');
		}).catch(() => {
			Router.getInstance().go(paths.authorization);
		});
	};

	getUsers = (id: string): void => {
		chatsApi.requestUsers(id).then((data) => {
			store.setState(data, 'chat-users');
		}).catch(() => {
			this.getChats();
		});
	};

	deleteUser = (id: string, chatId: string): void => {
		const data = {
			users: [id],
			chatId,
		};
		chatsApi.deleteUser(data).then(() => {
			this.getUsers(chatId);
		});
	};

	addUser = (id: string, chatId: string): void => {
		const data = {
			users: [id],
			chatId,
		};
		chatsApi.addUser(data).then(() => {
			this.getUsers(chatId);
		});
	};

	createChat = (title: string): void => {
		const data = {title};

		chatsApi.create(data).then(() => {
			this.getPageData();
		});
	};

	updateChatAvatar = (chatId: string, formData: FormData): void => {
		formData.append('chatId', chatId);
		chatsApi.updateAvatar(formData).then(() => {
			this.getChats();
		}).catch();
	};

	searchUser = (login: string): void => {
		userApi.searchUserByLogin(login).then((data) => {
			if (data) store.setState(data, 'found-users');
		});
	};

	initChat = (chatId: string): void => {
		chatsApi.getToken(chatId).then((response) => {
			if (!response) return;
			const user = store.get('userInfo') as { [key: string]: unknown };
			const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${response}`);
			socket.addEventListener('open', () => {
				socket.send(JSON.stringify({
					content: '0',
					type: 'get old',
				}));
				console.log('Соединение установлено');
			});
			socket.addEventListener('close', (event) => {
				if (event.wasClean) {
					console.log('Соединение закрыто чисто');
				} else {
					console.log('Обрыв соединения');
				}

				console.log(`Код: ${event.code} | Причина: ${event.reason}`);
			});
			socket.addEventListener('message', (event) => {
				if (!event.data) return;
				const data = JSON.parse(event.data);
				if (Array.isArray(data)) {
					data.reverse();
					store.setState(data, 'messages');
					return;
				}
				if (data.type !== 'message') return;
				let oldData = store.get('messages') as Array<{ [key: string]: unknown }>;
				oldData = oldData ? [...oldData, data] : [data];

				store.setState(oldData, 'messages');
			});
			socket.addEventListener('error', (event) => {
				console.log('Ошибка', event);
			});
			store.setState(socket, 'socket');
		}).catch(() => {
			Router.getInstance().go(paths.authorization);
		});
	}
}
