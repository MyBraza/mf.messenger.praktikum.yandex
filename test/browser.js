const Handlebars = require("handlebars");
const {JSDOM} = require("jsdom");
const chai = require('chai')
	, spies = require('chai-spies');

chai.use(spies);
const dom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>");
global["window"] = dom.window;
global["document"] = dom.window.document;
global.Handlebars = Handlebars;