import BaseAPI from "../utils/base-api";
import HTTPRequest from "../utils/HTTPRequest";
import Router from "../utils/router";
import paths from "../utils/paths";

class UserApi extends BaseAPI {
	request() {
		return HTTPRequest.get('/auth/user').then(response => {
			if ((<XMLHttpRequest>response).status === 200) {
				return JSON.parse((<XMLHttpRequest>response).response);
			}
			Router.getInstance().go(paths.authorization);
			return false;
		});
	}

	update(data: { [key: string]: unknown }) {
		return HTTPRequest.put('/user/profile', {data});
	}

	updatePassword(data: { [key: string]: unknown }) {
		return HTTPRequest.put('/user/password', {data});
	}

	searchUserByLogin(login: string) {
		const data = {login};
		return HTTPRequest.post('/user/search', {data}).then(response=>{
			if ((<XMLHttpRequest>response).status === 200) {
				return JSON.parse((<XMLHttpRequest>response).response);
			}
		});
	}
}

export default new UserApi();