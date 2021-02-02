'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uwuifier = void 0;
var utils_1 = require("./utils");
var seed_1 = require("./seed");
var Uwuifier = /** @class */ (function () {
    function Uwuifier(_a) {
        var _b = _a === void 0 ? {
            spaces: { faces: 0.05, actions: 0.075, stutters: 0.1 },
            words: 0.7,
            exclamations: 1
        } : _a, _c = _b.spaces, spaces = _c === void 0 ? { faces: 0.05, actions: 0.075, stutters: 0.1 } : _c, _d = _b.words, words = _d === void 0 ? 1 : _d, _e = _b.exclamations, exclamations = _e === void 0 ? 1 : _e;
        this.faces = ["(\u30FB`\u03C9\u00B4\u30FB)", ";;w;;", 'OwO', "UwU", ">w<", "^w^", "\u00DAw\u00DA", '^-^', ":3", "x3"];
        this.exclamations = ["!?", "?!!", "?!?1", "!!11", "?!?!"];
        this.actions = [
            "*blushes*",
            "*whispers to self*",
            '*cries*',
            '*screams*',
            '*sweats*',
            '*twerks*',
            "*runs away*",
            '*screeches*',
            '*walks away*',
            "*sees bulge*",
            '*looks at you*',
            "*notices buldge*",
            "*starts twerking*",
            "*huggles tightly*",
            "*boops your nose*"
        ];
        this.uwuMap = [
            [/(?:r|l)/g, "w"],
            [/(?:R|L)/g, "W"],
            [/n([aeiou])/g, "ny$1"],
            [/N([aeiou])/g, "Ny$1"],
            [/N([AEIOU])/g, "Ny$1"],
            [/ove/g, "uv"]
        ];
        this._spacesModifier = spaces !== null && spaces !== void 0 ? spaces : {
            faces: 0.05,
            actions: 0.075,
            stutters: 0.1
        };
        this._wordsModifier = words !== null && words !== void 0 ? words : 0.7;
        this._exclamationsModifier = exclamations !== null && exclamations !== void 0 ? exclamations : 1;
    }
    Uwuifier.prototype.uwuifyWords = function (sentence) {
        var _this = this;
        var words = sentence.split(" ");
        var uwuifiedSentence = words
            .map(function (word) {
            if (utils_1.isUri(word))
                return word;
            var seed = new seed_1.Seed(word);
            for (var _i = 0, _a = _this.uwuMap; _i < _a.length; _i++) {
                var _b = _a[_i], oldWord = _b[0], newWord = _b[1];
                // Generate a random value for every map so words will be partly uwuified instead of not at all
                if (seed.random() > _this._wordsModifier)
                    continue;
                word = word.replace(oldWord, newWord);
            }
            return word;
        })
            .join(' ');
        return uwuifiedSentence;
    };
    Uwuifier.prototype.uwuifySpaces = function (sentence) {
        var _this = this;
        var words = sentence.split(" ");
        var faceThreshold = this._spacesModifier.faces;
        var actionThreshold = this._spacesModifier.actions + faceThreshold;
        var stutterThreshold = this._spacesModifier.stutters + actionThreshold;
        var uwuifiedSentence = words
            .map(function (word, index) {
            var seed = new seed_1.Seed(word);
            var random = seed.random();
            var firstCharacter = word[0];
            if (random <= faceThreshold && _this.faces) {
                // Add random face before the word
                word += ' ' + _this.faces[seed.randomInt(0, _this.faces.length - 1)];
                checkCapital();
            }
            else if (random <= actionThreshold && _this.actions) {
                // Add random action before the word
                word += ' ' + _this.actions[seed.randomInt(0, _this.actions.length - 1)];
                checkCapital();
            }
            else if (random <= stutterThreshold && !utils_1.isUri(word)) {
                // Add stutter with a length between 0 and 2
                var stutter = seed.randomInt(0, 2);
                return (firstCharacter + '-').repeat(stutter) + word;
            }
            function checkCapital() {
                // Check if we should remove the first capital letter
                if (firstCharacter !== firstCharacter.toUpperCase())
                    return;
                // if word has higher than 50% upper case
                if (utils_1.getCapitalPercentage(word) > 0.5)
                    return;
                // If it's the first word
                if (index === 0) {
                    // Remove the first capital letter
                    word = firstCharacter.toLowerCase() + word.slice(1);
                }
                else {
                    var previousWord = words[index - 1];
                    var previousWordLastChar = previousWord[previousWord.length - 1];
                    var prevWordEndsWithPunctuation = new RegExp('[.!?\\-]').test(previousWordLastChar);
                    if (!prevWordEndsWithPunctuation)
                        return;
                    word = firstCharacter.toLowerCase() + word.slice(1);
                }
            }
            return word;
        })
            .join(' ');
        return uwuifiedSentence;
    };
    Uwuifier.prototype.uwuifyExclamations = function (sentence) {
        var _this = this;
        var words = sentence.split(" ");
        var pattern = new RegExp('[?!]+$');
        var uwuifiedSentence = words
            .map(function (word) {
            var seed = new seed_1.Seed(word);
            // If there are no exclamations return
            if (!pattern.test(word) || seed.random() > _this._exclamationsModifier)
                return word;
            word = word.replace(pattern, "");
            word += _this.exclamations[seed.randomInt(0, _this.exclamations.length - 1)];
            return word;
        })
            .join(' ');
        return uwuifiedSentence;
    };
    Uwuifier.prototype.uwuifySentence = function (sentence) {
        var uwuifiedString = sentence;
        uwuifiedString = this.uwuifyWords(uwuifiedString);
        uwuifiedString = this.uwuifyExclamations(uwuifiedString);
        uwuifiedString = this.uwuifySpaces(uwuifiedString);
        return uwuifiedString;
    };
    __decorate([
        utils_1.InitModifierParam()
    ], Uwuifier.prototype, "_spacesModifier", void 0);
    __decorate([
        utils_1.InitModifierParam()
    ], Uwuifier.prototype, "_wordsModifier", void 0);
    __decorate([
        utils_1.InitModifierParam()
    ], Uwuifier.prototype, "_exclamationsModifier", void 0);
    return Uwuifier;
}());
exports.Uwuifier = Uwuifier;
