import render from "./render.js";
import errorPage from "../components/error-page/error-page.js";
const errorData = {
    id: '500',
    text: 'Что то пошло не так',
};
const page = new errorPage(errorData, 'form-window__authorization-page');
render('body', page);
//# sourceMappingURL=500.js.map