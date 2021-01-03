import { expect } from 'chai';
import Router from '../src/utils/router';
import Route from "../src/utils/route";
import Block from "../src/components/block";

describe('Router tests', () => {

	const pathName = '/path';
	it('Two instances of Router should be equal (Singleton)', () => {
		const router1 = new Router('query1');
		const router2 = new Router('query2');

		expect(router1).to.be.equal(router2).and.to.be.equal(Router.getInstance()).and.to.be.an.instanceOf(Router);
	});

	it('getRoute should return an Instance of Route for this Path', () => {
		const router = Router.getInstance();
		router.use(pathName, Block, {});

		expect(router.getRoute(pathName)).to.be.an.instanceOf(Route);
	});

});