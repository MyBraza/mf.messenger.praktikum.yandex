import BaseAPI from "../utils/base-api";
import HTTPRequest from "../utils/HTTPRequest";

class AuthApi extends BaseAPI {
	signUp(data:{ [key: string]: unknown }) {
		return HTTPRequest.get('/auth//auth/signup', {data}).then(response => response);
	}

	signIn(data:{ [key: string]: unknown }) {
		return HTTPRequest.post('/auth/signin', {data}).then(response => response);
	}

	logout(){
		return HTTPRequest.post('/auth/logout', {}).then(response => response);
	}
}

export default new AuthApi();