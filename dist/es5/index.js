"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hasProxy = typeof Proxy !== 'undefined';
function createWithProxy(source) {
    var usage = new Set();
    var usedKeys = [];
    var proxy = new Proxy(source, {
        get: function (target, key) {
            if (!usage.has(key)) {
                usage.add(key);
                usedKeys.push(key);
            }
            return target[key];
        }
    });
    return {
        proxy: proxy,
        usage: usage,
        usedKeys: usedKeys,
        resetUsage: function () {
            usage.clear();
            usedKeys.length = 0;
        }
    };
}
function createWithDecorator(source) {
    var proxy = {};
    var usage = new Set();
    var usedKeys = [];
    Object.setPrototypeOf(proxy, Object.getPrototypeOf(source));
    Object
        .getOwnPropertyNames(source)
        .forEach(function (key) { return Object.defineProperty(proxy, key, {
        get: function () {
            if (!usage.has(key)) {
                usage.add(key);
                usedKeys.push(key);
            }
            return source[key];
        },
        enumerable: true
    }); });
    return {
        proxy: proxy,
        usage: usage,
        usedKeys: usedKeys,
        resetUsage: function () {
            usage.clear();
            usedKeys.length = 0;
        }
    };
}
function withKnowUsage(source) {
    return hasProxy
        ? createWithProxy(source)
        : createWithDecorator(source);
}
exports.withKnowUsage = withKnowUsage;
