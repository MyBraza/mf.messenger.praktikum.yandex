import Router from "./utils/router.js";
import FormWindow from "./components/form-window/form-window.js";
import ErrorPage from "./components/error-page/error-page.js";
import Chats from "./components/chats/chats.js";
import Settings from "./components/settings/settings.js";

const authorization = {
	tittle: 'Вход',
	classExtension: '',
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
		href: '/registration',
		text: 'Создать аккаунт'
	}
};

const registration = {
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
		href: '/authorization',
		text: 'Авторизоваться'
	}
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
		placeholder: 'Поиск'
	},
	chatsList: {
		id1: [{sender: 'user', contentText: 'test1', date: 'Вчера, в 17:29'},
			{sender: 'id1', contentText: 'test2', date: 'Вчера, в 17:30'},
			{sender: 'user', contentText: 'test1', date: 'Вчера, в 17:29'},
			{sender: 'id1', contentText: 'test2', date: 'Вчера, в 17:30'},],
		id2: [{sender: 'user', contentText: 'afsdfasdf', date: 'Вчера, в 17:29'},
			{sender: 'id2', contentText: 'asdfasdf', date: 'Вчера, в 17:30'},
			{sender: 'user', contentText: 'asdfasdfasd', date: 'Вчера, в 17:29'},
			{sender: 'id2', contentText: 'asdfasdfas', date: 'Вчера, в 17:30'},
			{sender: 'user', contentText: 'asdfasdfasd', date: 'Вчера, в 17:29'},
			{sender: 'id2', contentText: 'asdfasdfs', date: 'Вчера, в 17:30'},],
	},
	messageInput: {
		formName: 'message-input',
		pasteIcon: 'icon-plus-circled',
		placeholder: 'Введите текст сообщения',
		sendIcon: 'icon-angle-circled-right',
	},
	contacts: {
		id1: {
			status: 'dont-disturb',
			icon: 'icon-circle',
			imgURL: 'img/austin-distel-5hAVfzXs7GY-unsplash-min.jpg',
			displayName: 'Илон Маск',
			text: 'Lorem ipsum dolor sit amet.',
		},
		id2: {
			status: 'away',
			icon: 'icon-circle',
			imgURL: 'img/20170629_103915-min.jpg',
			displayName: 'Петр Винник',
			text: 'Lorem ipsum dolor sit amet.',
		},
	},
	userBar: {
		imgURL: 'img/alex-suprun-ZHvM3XIOHoE-unsplash-min.jpg',
		icon: 'icon-circle',
		displayName: 'Иван Иванов',
		email: 'pochta@yandex.ru',
		settingsIcon: 'icon-cog',
	},
	chooseChat: {
		icon: 'icon-comment',
		text: 'Выберите чат чтобы начать общение',
	},
	render: {
		test: 'test'
	},
	currentChat: undefined,
};

const settings = {
	settingsHead: {
		returnIcon: 'icon-left-big',
		text: 'Управление профилем'
	},
	settings: {
		userSettings: {
			icon: 'icon-id-card',
			tittle: 'Информация о пользователе',
		},
		logOut: {
			icon: 'icon-logout',
			tittle: 'Выйти',
		}
	},
	userBar: {
		imgURL: 'img/alex-suprun-ZHvM3XIOHoE-unsplash-min.jpg',
		icon: 'icon-circle',
		displayName: 'Иван Иванов',
		email: 'pochta@yandex.ru',
		settingsIcon: 'icon-cog',
	},
	userSettings: {
		formInputs: {
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
			display_name: {
				tittle: 'Отображаемое имя',
				type: 'text',
				placeholder: 'Введите имя',
				with: 'login'
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
				with: 'phone'
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
				with: 'oldPassword'
			},
			oldPassword: {
				tittle: 'Старый пароль',
				type: 'password',
				placeholder: 'Введите пароль',
			},
		},
		buttons: {
			submitButton: {
				attributes: {
					"type": "submit",
					"data-form-name": "profile-info",
					"class": "form-button",
					"id": "submit-button",
				},
				text: "Сохранить"
			},
			cancelButton: {
				attributes: {
					"data-form-name": "profile-info",
					"class": "form-button_empty",
					"id": "cancel-button",
				},
				text: "Вернуться"
			},
		},
	}
};

const router = new Router('body', '/authorization');

router
	.use('/authorization', FormWindow, authorization)
	.use('/error404', ErrorPage, error404)
	.use('/error500', ErrorPage, error500)
	.use('/registration', FormWindow, registration)
	.use('/chats', Chats, chats)
	.use('/settings', Settings, settings)
	.start();