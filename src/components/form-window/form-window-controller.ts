import authApi from "../../api/auth-api";
import Router from "../../utils/router";
import paths from "../../utils/paths";

export default class FormWindowController {
	signIn(data: { [key: string]: unknown }) {
		authApi.signIn(data).then(({status}) => {
			if (status === 200) {
				Router.getInstance().go(paths.chats)
			}
		});
	}

	signUp(data:{[key:string]:unknown}){
		authApi.signUp(data).then(({status})=>{
			if (status === 200) {
				Router.getInstance().go(paths.chats)
			}
		})
	}

	logOut(){
		authApi.logout().then();
	}
}