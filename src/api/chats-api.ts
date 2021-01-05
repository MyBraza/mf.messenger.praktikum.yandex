import BaseAPI from "../utils/base-api";
import HTTPRequest from "../utils/HTTPRequest";
import Router from "../utils/router";
import paths from "../utils/paths";

class ChatsApi extends BaseAPI {

	create(data: { [key: string]: unknown }) {
		return HTTPRequest.post('/chats', {data});
	}

	requestUsers(id: string) {
		return HTTPRequest.get(`/chats/${id}/users`).then((response) => {
			let data = JSON.parse((<XMLHttpRequest>response).response);
			if ((<XMLHttpRequest>response).status === 200) {
				return data
			}
		});
	}

	deleteUser(data: { [key: string]: unknown }) {
		return HTTPRequest.delete('/chats/users', {data});
	}

	addUser(data: { [key: string]: unknown }) {
		return HTTPRequest.put('/chats/users', {data});
	}

	request() {
		return HTTPRequest.get('/chats').then(response=>{
			let data = JSON.parse((<XMLHttpRequest>response).response);
			if ((<XMLHttpRequest>response).status === 200) {
				return data
			}
			if ((<XMLHttpRequest>response).status === 500) {
				Router.getInstance().go(paths.error500);
				throw new Error('500: something went wrong');
			}
		});
	}
}

export default new ChatsApi();