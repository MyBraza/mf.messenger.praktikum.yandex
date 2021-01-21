import BaseAPI from 'utils/base-api';
import HTTPRequest from 'utils/HTTPRequest';

class ChatsApi extends BaseAPI {
	create(data: { [key: string]: unknown }) {
		return HTTPRequest.post('/chats', {data});
	}

	requestUsers(id: string) {
		return HTTPRequest.get(`/chats/${id}/users`);
	}

	deleteUser(data: { [key: string]: unknown }) {
		return HTTPRequest.delete('/chats/users', {data});
	}

	addUser(data: { [key: string]: unknown }) {
		return HTTPRequest.put('/chats/users', {data});
	}

	updateAvatar(data: FormData) {
		return HTTPRequest.put('/chats/avatar', {
			data,
			headers: {
				'Content-Type': '',
			},
		});
	}

	request() {
		return HTTPRequest.get('/chats');
	}

	getToken(id: string) {
		return HTTPRequest.post(`/chats/token/${id}`).then((response: { [key: string]: unknown }) => response.token);
	}
}

export default new ChatsApi();
