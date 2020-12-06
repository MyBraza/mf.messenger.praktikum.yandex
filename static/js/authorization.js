import formWindow from "../components/form-window/form-window.js";
import render from "./render.js";
const formData = {
    tittle: 'Вход',
    classExtension: '',
    items: {
        login: {
            render: '',
            tittle: 'Логин',
            type: 'text',
            placeholder: 'Введите логин',
        },
        password: {
            render: '',
            tittle: 'Пароль',
            type: 'password',
            placeholder: 'Введите пароль',
        }
    },
    button: {
        attributes: {
            "type": "submit",
            "data-form-name": "authorization",
            "class": "form-button",
            "id": "submit-button",
        },
        text: "Авторизоваться"
    },
    link: {
        href: 'registration.html',
        text: 'Создать аккаунт'
    }
};
const form = new formWindow(formData, 'form-window__authorization-page');
render('body', form);
//# sourceMappingURL=authorization.js.map