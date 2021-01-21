const {JSDOM} = require('jsdom');
const chai = require('chai')
	, spies = require('chai-spies');

chai.use(spies);
const dom = new JSDOM('<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body></body></html></html>');
global['window'] = dom.window;
global['document'] = dom.window.document;