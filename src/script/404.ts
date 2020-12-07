import render from "./render.js";
import errorPage from "../components/error-page/error-page.js";

const errorData = {
	id: '404',
	text: 'Страница не найдена',
};

const page = new errorPage(errorData, 'form-window__authorization-page');

render('body', page);