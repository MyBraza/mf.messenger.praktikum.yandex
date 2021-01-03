import Router from "../../utils/router";
import store from "../../utils/store";
import userApi from "../../api/user-api";
import paths from "../../utils/paths";

export default class SettingsController {
	getUserInfo() {
		userApi.request().then(response => {
			if ((<XMLHttpRequest>response).status !== 200) {
				store.setState({}, 'userInfo');
				Router.getInstance().go(paths.authorization);
				return false;
			}
			store.setState(JSON.parse((<XMLHttpRequest>response).response), 'userInfo');
			return true
		})
	}

	updateUserInfo(form: HTMLFormElement) {
		if (form) {
			let formData = new FormData(form);
			let data: { [key: string]: unknown } = {};
			for (let key of formData.keys()) {
				data[key] = formData.get(key);
			}
			userApi.update(data).then(({status}) => {
				if (status === 200) {
					Router.getInstance().go(paths.chats);
				}
			});
			if (!!data.oldPassword && !!data.newPassword) {
				userApi.updatePassword(data).then();
			}
		}
	}
}