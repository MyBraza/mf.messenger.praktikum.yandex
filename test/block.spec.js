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
var block_1 = require("../src/components/block");
describe('Проверка методов базового класса Block', function () {
    function createBlock() {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        return new (block_1.default.bind.apply(block_1.default, __spreadArrays([void 0], options)))();
    }
    it('Должен вернуть инстанс блока', function () {
        var block = createBlock();
        chai_1.expect(block).to.be.a.instanceOf(block_1.default);
    });
    it('Должен вернуть HTML елемент а не null', function () {
        var block = createBlock();
        chai_1.expect(block.getElement()).to.not.be.a('null');
    });
    //Я не совсем понимаю как еще можно протестировать блок.
    //Был бы рад если бы посоветовали какие кейсы каких методов тут можно проверить.
});
