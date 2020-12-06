import formWindow from "../components/form-window/form-window.js";
import render from "./render.js";
const formData = {
    tittle: 'Регистрация',
    classExtension: 'form-window_long',
    items: {
        first_name: {
            tittle: 'Имя',
            type: 'text',
            placeholder: 'Введите имя',
            with: 'second_name'
        },
        second_name: {
            tittle: 'Фамилия',
            type: 'text',
            placeholder: 'Введите фамилию'
        },
        login: {
            tittle: 'Логин',
            type: 'text',
            placeholder: 'Введите логин',
        },
        password: {
            tittle: 'Пароль',
            type: 'password',
            placeholder: 'Введите пароль',
        },
        email: {
            tittle: 'Почта',
            type: 'email',
            placeholder: 'Введите аддрес электронной почты',
        },
        phone: {
            tittle: 'Телефон',
            type: 'tel',
            placeholder: 'Введите номер телефона',
        },
    },
    button: {
        attributes: {
            "type": "submit",
            "data-form-name": "authorization",
            "class": "form-button",
            "id": "submit-button",
        },
        text: "Зарегистрироваться"
    },
    link: {
        href: 'authorization.html',
        text: 'Авторизоваться'
    }
};
const form = new formWindow(formData, 'form-window__authorization-page');
render('body', form);
//# sourceMappingURL=registration.js.map