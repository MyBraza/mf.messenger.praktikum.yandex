import Router from 'utils/router';
import FormWindow from 'pages/form-window/form-window';
import AlertPage from 'pages/alert-page/alert-page';
import Chats from 'pages/chats/chats';
import Settings from 'pages/settings/settings';
import HTTPRequest from 'utils/HTTPRequest';
import paths from 'utils/paths';
import './main.less';
import 'normalize.css';

const authorization = {
	tittle: 'Вход',
	classExtension: '',
	requestURL: '/auth/signin',
	items: {
		login:
			{
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
		},
	},
	button: {
		attributes: {
			type: 'submit',
			'data-form-name': 'authorization',
			class: 'form-button',
			id: 'submit-button',
		},
		text: 'Авторизоваться',
	},
	link: {
		href: '/registration',
		text: 'Создать аккаунт',
	},
};

const registration = {
	tittle: 'Регистрация',
	classExtension: 'form-window_long',
	requestURL: '/auth/signup',
	items: {
		first_name: {
			tittle: 'Имя',
			type: 'text',
			placeholder: 'Введите имя',
			with: 'second_name',
		},
		second_name: {
			tittle: 'Фамилия',
			type: 'text',
			placeholder: 'Введите фамилию',
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
			type: 'submit',
			'data-form-name': 'authorization',
			class: 'form-button',
			id: 'submit-button',
		},
		text: 'Зарегистрироваться',
	},
	link: {
		href: '/authorization',
		text: 'Авторизоваться',
	},
};

const error404 = {
	id: '404',
	text: 'Страница не найдена',
};

const error500 = {
	id: '500',
	text: 'Что то пошло не так',
};

const chats = {
	search: {
		id: 'chat-list-search',
		icon: 'icon-search',
		placeholder: 'Поиск',
	},
	messageInput: {
		formName: 'message-input',
		pasteIcon: 'icon-plus-circled',
		placeholder: 'Введите текст сообщения',
		sendIcon: 'icon-angle-circled-right',
	},
	userBar: {
		avatar: 'img/alex-suprun-ZHvM3XIOHoE-unsplash-min.jpg',
		icon: 'icon-circle',
		settingsIcon: 'icon-cog',
	},
	chooseChat: {
		icon: 'icon-comment',
		text: 'Выберите чат чтобы начать общение',
	},
	render: {
		test: 'test',
	},
	currentChat: undefined,
};

const settings = {
	settingsHead: {
		returnIcon: 'icon-left-big',
		text: 'Управление профилем',
	},
	settings: {
		userSettings: {
			icon: 'icon-id-card',
			tittle: 'Информация о пользователе',
			path: paths.settings,
		},
		logOut: {
			icon: 'icon-logout',
			tittle: 'Выйти',
			path: paths.authorization,
		},
	},
	userBar: {
		avatar: 'img/alex-suprun-ZHvM3XIOHoE-unsplash-min.jpg',
		icon: 'icon-circle',
		settingsIcon: 'icon-cog',
	},
	userSettings: {
		formInputs: {
			first_name: {
				tittle: 'Имя',
				type: 'text',
				placeholder: 'Введите имя',
				with: 'second_name',
			},
			second_name: {
				tittle: 'Фамилия',
				type: 'text',
				placeholder: 'Введите фамилию',
			},
			display_name: {
				tittle: 'Отображаемое имя',
				type: 'text',
				placeholder: 'Введите имя',
				with: 'login',
				required: 'false',
			},
			login: {
				tittle: 'Логин',
				type: 'text',
				placeholder: 'Введите логин',
			},
			email: {
				tittle: 'Почта',
				type: 'email',
				placeholder: 'Введите аддрес электронной почты',
				with: 'phone',
			},
			phone: {
				tittle: 'Телефон',
				type: 'tel',
				placeholder: 'Введите номер телефона',
			},
			newPassword: {
				tittle: 'Новый пароль',
				type: 'password',
				placeholder: 'Введите пароль',
				with: 'oldPassword',
				required: 'false',
			},
			oldPassword: {
				tittle: 'Старый пароль',
				type: 'password',
				placeholder: 'Введите пароль',
				required: 'false',
			},
		},
		buttons: {
			submitButton: {
				attributes: {
					type: 'submit',
					'data-form-name': 'profile-info',
					class: 'form-button',
					id: 'submit-button',
				},
				text: 'Сохранить',
			},
			cancelButton: {
				attributes: {
					'data-form-name': 'profile-info',
					class: 'form-button_empty',
					id: 'cancel-button',
				},
				text: 'Вернуться',
			},
		},
	},
};

HTTPRequest.baseURL = 'https://ya-praktikum.tech/api/v2';
const router = new Router('body', '/chats');

router
	.use(paths.settings, Settings, settings)
	.use(paths.authorization, FormWindow, authorization)
	.use(paths.error404, AlertPage, error404)
	.use(paths.error500, AlertPage, error500)
	.use(paths.registration, FormWindow, registration)
	.use(paths.chats, Chats, chats)
	.start();

router.go(paths.chats);
