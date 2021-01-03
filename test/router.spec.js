"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var router_1 = require("../src/utils/router");
var route_1 = require("../src/utils/route");
describe('Проверка методов базового Router', function () {
    function createRouter() {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        return new (router_1.default.bind.apply(router_1.default, __spreadArrays([void 0], options)))();
    }
    it('Два инстанса Роутера должны быть равны (Синглтон)', function () {
        var router1 = createRouter('query1');
        var router2 = createRouter('query2');
        chai_1.expect(router1).to.be.equal(router2).and.to.be.equal(router_1.default.getInstance()).and.to.be.an.instanceOf(router_1.default);
    });
    it('Два инстанса Роутера должны быть равны (Синглтон)', function () {
        var router1 = createRouter('body');
        chai_1.expect(router1).to.be.equal(router1).and.to.be.an.instanceOf(route_1.default);
    });
});
