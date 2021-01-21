import BaseAPI from 'utils/base-api';
import HTTPRequest from 'utils/HTTPRequest';

class UserApi extends BaseAPI {
	request() {
		return HTTPRequest.get('/auth/user');
	}

	update(data: { [key: string]: unknown }) {
		return HTTPRequest.put('/user/profile', {data});
	}

	updateAvatar(data: { [key: string]: unknown } | FormData) {
		return HTTPRequest.put('/user/profile/avatar', {
			data,
			headers: {
				'Content-Type': '',
			},
		});
	}

	updatePassword(data: { [key: string]: unknown }) {
		return HTTPRequest.put('/user/password', {data});
	}

	searchUserByLogin(login: string) {
		const data = {login};
		return HTTPRequest.post('/user/search', {data});
	}
}

export default new UserApi();
