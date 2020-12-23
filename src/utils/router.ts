import Route from "./route.js";
import Block from "../components/block.js";

interface Props {
	[key: string]: unknown
}

class Router {
	private static __instance: Router;
	routes: Array<Route>;
	history: typeof window.history;
	_currentRoute: Route | null;
	_rootQuery: string;
	_rootPath: string;
	_error404: string;

	public static getInstance(...args:Array<string|undefined>): Router {
		if (!Router.__instance) {
			Router.__instance = new Router(...args);
		}

		return Router.__instance;
	}

	constructor(rootQuery: string = 'body', rootPath: string = '/home', error404:string = '/error404') {
		if (Router.__instance) {
			return Router.__instance;
		}
		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;
		this._rootPath = rootPath;
		this._error404 = error404;
		Router.__instance = this;
	}

	use(pathname: string, block: typeof Block, props:Props) {
		const route = new Route(pathname, block, this._rootQuery, props);
		this.routes.push(route);
		return this
	}

	start() {
		window.onpopstate = (event: PopStateEvent) => {
			event.preventDefault();
			if (event.currentTarget !== null) {
				this._onRoute((<Window>event.currentTarget).location.pathname);
			}
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname:string) {
		if(pathname === '' || pathname === '/'){
			pathname = this._rootPath;
		}
		let route = this.getRoute(pathname);

		if (!route) {
			route = this.getRoute(this._error404);
			if(!route){
				return
			}
		}

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	go(pathname:string = this._rootPath) {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname:string) {
		return this.routes.find(route => route.match(pathname));
	}
}

export default Router
