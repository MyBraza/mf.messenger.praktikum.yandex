import BaseAPI from "../utils/base-api";
import HTTPRequest from "../utils/HTTPRequest";

class UserApi extends BaseAPI {
	request() {
		return HTTPRequest.get('/auth/user', {}).then(response => response);
	}

	update(data: { [key: string]: unknown }) {
		return HTTPRequest.put('/user/profile', {data}).then(response => response);
	}

	updatePassword(data:{[key:string]:unknown}){
		return HTTPRequest.put('/user/password', {data}).then(response => response);
	}

	searchUserByLogin(login:string){
		const data = {login};
		return HTTPRequest.post('/user/search', {data}).then(response => response);
	}
}

export default new UserApi();