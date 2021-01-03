import { expect } from 'chai';
import HTTPRequest from '../src/utils/HTTPRequest';

describe('HTTPRequests tests', () => {
	it('Requests should return Promise', () => {
		expect(HTTPRequest.get('url',{})).to.be.an('Promise');
		expect(HTTPRequest.put('url',{})).to.be.an('Promise');
		expect(HTTPRequest.post('url',{})).to.be.an('Promise');
		expect(HTTPRequest.delete('url',{})).to.be.an('Promise');
	});

});