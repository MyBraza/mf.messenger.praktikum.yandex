import store from "./store";
import chatsApi from "../api/chats-api";
import userApi from "../api/user-api";

export default class ChatsController {

	getPageData = () => {
		userApi.request().then(data => {
			if (!data) return false;
			store.setState(data, 'userInfo');
			return true;

		}).then((authorized) => {
			if (!authorized) return;
			chatsApi.request().then((data) => {
				if (data) store.setState(data, 'chats');
			});
		})
	};

	getUsers = (id: string) => {
		chatsApi.requestUsers(id).then((data) => {
			if (data) {
				store.setState(data, `chat-users`);
			} else {
				this.getPageData();
			}
		})
	};

	deleteUser(id: string, chatId: string) {
		const data = {
			users: [id],
			chatId
		};
		chatsApi.deleteUser(data).then(() => {
			this.getUsers(chatId);
		})
	}

	addUser(id: string, chatId: string) {
		const data = {
			users: [id],
			chatId
		};
		chatsApi.addUser(data).then(() => {
			this.getUsers(chatId);
		})
	}

	createChat = (title: string) => {
		const data = {title};

		chatsApi.create(data).then(() => {
			this.getPageData();
		});
	};

	searchUser(login: string) {
		userApi.searchUserByLogin(login).then(data => {
			if (data) store.setState(data, `found-users`);
		})
	}

}