import Router from 'utils/router';
import store from 'utils/store';
import userApi from 'api/user-api';
import paths from 'utils/paths';

export default class SettingsController {
	getUserInfo(): void {
		userApi.request().then((data: { [key: string]: unknown }) => {
			if (!data) return;
			data.avatar = data.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : data.avatar;
			store.setState(data, 'userInfo');
		}).catch(() => {
			Router.getInstance().go(paths.authorization);
		});
	}

	updateUserInfo(formData: HTMLFormElement): void {
		const data: { [key: string]: unknown } = {};
		for (const key of formData.keys()) {
			data[key] = formData.get(key);
		}
		if (data.avatar) {
			userApi.updateAvatar(formData).then().catch((response) => console.log(response));
		}
		userApi.update(data).then(() => {
			Router.getInstance().go(paths.chats);
		}).catch(() => {
			Router.getInstance().go(paths.authorization);
		});
		if (!!data.oldPassword && !!data.newPassword) {
			userApi.updatePassword(data).then().catch((response) => console.log(response));
		}
	}
}
