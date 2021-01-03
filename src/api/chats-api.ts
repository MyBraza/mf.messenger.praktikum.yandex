import BaseAPI from "../utils/base-api";
import HTTPRequest from "../utils/HTTPRequest";

class ChatsApi extends BaseAPI {

	create(data: { [key: string]: unknown }) {
		return HTTPRequest.post('/chats', {data}).then((response) => response);
	}

	requestUsers(id: string) {
		return HTTPRequest.get(`/chats/${id}/users`, {}).then((response) => response);
	}

	deleteUser(data:{[key:string]:unknown}) {
		return HTTPRequest.delete('/chats/users', {data}).then((response) => response);
	}

	addUser(data:{[key:string]:unknown}) {
		return HTTPRequest.put('/chats/users', {data}).then((response) => response);
	}

	request() {
		return HTTPRequest.get('/chats', {}).then((response) => response);
	}
}

export default new ChatsApi();