import authApi from 'api/auth-api';
import Router from 'utils/router';
import paths from 'utils/paths';

export default class FormWindowController {
	signIn(data: { [key: string]: unknown }): void {
		authApi.signIn(data).then((response) => {
			if (response) {
				Router.getInstance().go(paths.chats);
			}
		}).catch((response) => {
			if (response.reason === 'user already in system') {
				Router.getInstance().go(paths.chats);
			}
		});
	}

	signUp(data: { [key: string]: unknown }): void {
		authApi.signUp(data).then((response: { [key: string]: unknown }) => {
			if (response) {
				Router.getInstance().go(paths.chats);
			}
		}).catch();
	}

	logOut(): void {
		authApi.logout().then().catch();
	}
}
