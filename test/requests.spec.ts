import { expect } from 'chai';
import HTTPRequest from '../src/utils/HTTPRequest';

describe('HTTPRequests tests', () => {

	it('HTTPRequest.get should return Promise', () => {
		expect(HTTPRequest.get('url',{})).to.be.an('Promise');
	});

	it('HTTPRequest.put should return Promise', () => {
		expect(HTTPRequest.put('url',{})).to.be.an('Promise');
	});

	it('HTTPRequest.post should return Promise', () => {
		expect(HTTPRequest.post('url',{})).to.be.an('Promise');
	});

	it('HTTPRequest.delete should return Promise', () => {
		expect(HTTPRequest.delete('url',{})).to.be.an('Promise');
	});

});