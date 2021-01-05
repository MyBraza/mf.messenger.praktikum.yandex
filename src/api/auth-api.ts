import BaseAPI from "../utils/base-api";
import HTTPRequest from "../utils/HTTPRequest";

class AuthApi extends BaseAPI {
	signUp(data: { [key: string]: unknown }) {
		return HTTPRequest.get('/auth/signup', {data});
	}

	signIn(data: { [key: string]: unknown }) {
		return HTTPRequest.post('/auth/signin', {data});
	}

	logout() {
		return HTTPRequest.post('/auth/logout');
	}
}

export default new AuthApi();