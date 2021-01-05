import chai from 'chai';
import Router from '../src/utils/router';
import Route from "../src/utils/route";
import Block from "../src/components/block";

const expect = chai.expect;

describe('Router tests', () => {

	it('Two instances of Router should be equal (Singleton)', () => {
		const router1 = new Router('query1');
		const router2 = new Router('query2');

		expect(router1).to.be.equal(router2).and.to.be.equal(Router.getInstance());
	});

	it('getRoute should return an Instance of Route for this Path', () => {
		const pathName = '/path';
		const router = Router.getInstance();
		router.use(pathName, Block, {});

		expect(router.getRoute(pathName)).to.be.an.instanceOf(Route);
	});

	it('start should call _onRoute with window.location.pathname', () => {
		const router = Router.getInstance();
		const spy = chai.spy();
		router._onRoute = spy;
		router.start();

		expect(spy).to.be.called.with(window.location.pathname);
	});

	it('go should call history.pushState with pathname if pathname is not equal window.location.pathname', () => {
		const pathName = '/path';
		const router = Router.getInstance();
		const spy = chai.spy();
		router.history.pushState = spy;
		router.go(pathName);

		expect(spy).to.be.called.with({}, "", pathName);
	});

	it('go should call _onRoute with pathname if pathname is not equal window.location.pathname', () => {
		const pathName = '/path';
		const router = Router.getInstance();
		const spy = chai.spy();
		router._onRoute = spy;
		router.go(pathName);

		expect(spy).to.be.called.with(pathName);
	});

	it('go should not call _onRoute nor history.pushState pathname is equal window.location.pathname', () => {
		const router = Router.getInstance();
		const spy = chai.spy();
		router._onRoute = spy;
		router.history.pushState = spy;
		router.go(window.location.pathname);

		expect(spy).to.not.be.called;
	});

	it('back should call history.back', () => {
		const router = Router.getInstance();
		const spy = chai.spy();
		router.history.back = spy;
		router.back();

		expect(spy).to.be.called();
	});

	it('forward should call history.forward', () => {
		const router = Router.getInstance();
		const spy = chai.spy();
		router.history.forward = spy;
		router.forward();

		expect(spy).to.be.called();
	});

	// Так и не смог понять как проверить _onRoute

});