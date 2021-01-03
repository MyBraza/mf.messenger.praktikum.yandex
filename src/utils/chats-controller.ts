import Router from "./router";
import store from "./store";
import chatsApi from "../api/chats-api";
import userApi from "../api/user-api";
import paths from "./paths";

export default class ChatsController {

	getPageData = () => {
		userApi.request().then(response => {
			let data = JSON.parse((<XMLHttpRequest>response).response);
			if ((<XMLHttpRequest>response).status !== 200) {
				Router.getInstance().go(paths.authorization);
				return false;
			}
			store.setState(data, 'userInfo');
			return true
		}).then((authorized) => {
			if (authorized) {
				chatsApi.request().then((response) => {
					let data = JSON.parse((<XMLHttpRequest>response).response);
					if ((<XMLHttpRequest>response).status === 200) {
						store.setState(data, 'chats');
					}
					if ((<XMLHttpRequest>response).status === 500) {
						Router.getInstance().go(paths.error500);
						throw new Error('500: something went wrong');
					}
				});
			}
		})
	};

	getUsers = (id: string) => {
		chatsApi.requestUsers(id).then((response) => {
			let data = JSON.parse((<XMLHttpRequest>response).response);
			if ((<XMLHttpRequest>response).status === 200) {
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
		chatsApi.deleteUser(data).then(response => {
			if ((<XMLHttpRequest>response).status === 200) {
				this.getUsers(chatId);
			}
		})
	}

	addUser(id:string, chatId:string) {
		const data = {
			users: [id],
			chatId
		};
		chatsApi.addUser(data).then(response => {
			if ((<XMLHttpRequest>response).status === 200) {
				this.getUsers(chatId);
			}
		})
	}

	createChat = (title: string) => {
		const data = {title};

		chatsApi.create(data).then((response) => {
			if ((<XMLHttpRequest>response).status === 200) {
				this.getPageData();
			}
		});
	};

	searchUser(login: string) {
		userApi.searchUserByLogin(login).then(response => {
			if ((<XMLHttpRequest>response).status === 200) {
				let data = JSON.parse((<XMLHttpRequest>response).response);
				store.setState(data, `found-users`);
			}
		})
	}

}