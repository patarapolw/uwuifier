'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUri = exports.InitModifierParam = exports.getCapitalPercentage = exports.getRandomInt = void 0;
exports.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getCapitalPercentage = function (input) {
    var totalLetters = 0;
    var upperLetters = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var currentLetter = input_1[_i];
        if (new RegExp(/^[a-zA-Z]+$/).test(currentLetter)) {
            totalLetters++;
            if (currentLetter === currentLetter.toUpperCase()) {
                upperLetters++;
            }
        }
    }
    return upperLetters / totalLetters;
};
exports.InitModifierParam = function () {
    return function (target, key) {
        var value = target[key];
        var sum = 0;
        var getter = function () { return value; };
        var setter = function (next) {
            if (typeof next === 'object') {
                sum = Object.values(next).reduce(function (a, b) { return a + b; });
            }
            if (next < 0 || sum < 0 || next > 1 || sum > 1) {
                throw new Error(key + " modifier value must be a number between 0 and 1");
            }
            value = next;
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
};
function isUri(value) {
    if (!value)
        return false;
    // check for illegal characters
    if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value))
        return false;
    // check for hex escapes that aren't complete
    if (/%[^0-9a-f]/i.test(value) || /%[0-9a-f](:?[^0-9a-f]|$)/i.test(value))
        return false;
    // directly from RFC 3986
    var split = value.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
    if (!split)
        return false;
    var _a = [split[1], split[2], split[3]], scheme = _a[0], authority = _a[1], path = _a[2];
    // scheme and path are required, though the path can be empty
    if (!(scheme && scheme.length && path.length >= 0))
        return false;
    // if authority is present, the path must be empty or begin with a /
    if (authority && authority.length) {
        if (!(path.length === 0 || /^\//.test(path)))
            return false;
    }
    else {
        // if authority is not present, the path must not start with //
        if (/^\/\//.test(path))
            return false;
    }
    // scheme must begin with a letter, then consist of letters, digits, +, ., or -
    if (!/^[a-z][a-z0-9\+\-\.]*$/.test(scheme.toLowerCase()))
        return false;
    return true;
}
exports.isUri = isUri;
