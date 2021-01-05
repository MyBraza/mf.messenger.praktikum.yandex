import Router from "../../utils/router";
import store from "../../utils/store";
import userApi from "../../api/user-api";
import paths from "../../utils/paths";

export default class SettingsController {
	getUserInfo() {
		userApi.request().then(data => {
			if (data) store.setState(data, 'userInfo');
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