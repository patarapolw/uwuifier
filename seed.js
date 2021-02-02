"use strict";
// This random seed package was previously publicated on the Deno site as a standalone package but I've decided to just integrate it into the Uwuifier
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed = void 0;
var Seed = /** @class */ (function () {
    function Seed(seed) {
        if (seed === void 0) { seed = ''; }
        this._seed = seed;
        this._seeder = this.generateSeeder(seed);
    }
    Seed.prototype.generateRange = function (value, min, max) {
        // Make sure the minimum and maximum values are correct
        if (min > max)
            throw new Error('The minimum value must be below the maximum value');
        else if (min === max)
            throw new Error('The minimum value cannot equal the maximum value');
        // Everything is run through the map value so if the defaults haven't changed just return
        else if (min === 0 && max === 1)
            return value;
        // Actually map the number range
        return ((value - 0) * (max - min)) / (1 - 0) + min;
    };
    Seed.prototype.generateSeeder = function (seed) {
        // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
        // This is a seeded random generator
        // Returns a function which returns a value between 0 and 0xFFFFFFFF (32-bits)
        // Had to use a eslint ignore here since var has different scoping than let
        // tslint:disable-next-line
        for (var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++)
            (h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)), (h = (h << 13) | (h >>> 19));
        return function () {
            h = Math.imul(h ^ (h >>> 16), 2246822507);
            h = Math.imul(h ^ (h >>> 13), 3266489909);
            return (h ^= h >>> 16) >>> 0;
        };
    };
    Object.defineProperty(Seed.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (seed) {
            // If the seed hasn't changed just return
            if (this._seed === seed)
                return;
            this._seed = seed;
            this._seeder = this.generateSeeder(seed);
        },
        enumerable: false,
        configurable: true
    });
    Seed.prototype.random = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        // Use the default sfc32 random generator
        return this.generateRange(this.sfc32(), min, max);
    };
    Seed.prototype.randomInt = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.round(this.random(min, max));
    };
    Seed.prototype.sfc32 = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        var a = this._seeder();
        var b = this._seeder();
        var c = this._seeder();
        var d = this._seeder();
        a >>>= 0;
        b >>>= 0;
        c >>>= 0;
        d >>>= 0;
        var t = (a + b) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        d = (d + 1) | 0;
        t = (t + d) | 0;
        c = (c + t) | 0;
        return this.generateRange((t >>> 0) / 4294967296, min, max);
    };
    Seed.prototype.mulberry32 = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        var a = this._seeder();
        var t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return this.generateRange(((t ^ (t >>> 14)) >>> 0) / 4294967296, min, max);
    };
    Seed.prototype.jsf32 = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        var a = this._seeder();
        var b = this._seeder();
        var c = this._seeder();
        var d = this._seeder();
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        // Using eslint here since this stolen code is definitely not optimized for readability
        // tslint:disable-next-line
        var t = (a - ((b << 27) | (b >>> 5))) | 0;
        a = b ^ ((c << 17) | (c >>> 15));
        b = (c + d) | 0;
        c = (d + t) | 0;
        d = (a + t) | 0;
        return this.generateRange((d >>> 0) / 4294967296, min, max);
    };
    Seed.prototype.xoshiro128 = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        var a = this._seeder();
        var b = this._seeder();
        var c = this._seeder();
        var d = this._seeder();
        // Using eslint here since this stolen code is definitely not optimized for readability
        // tslint:disable-next-line
        var t = b << 9, r = a * 5;
        r = ((r << 7) | (r >>> 25)) * 9;
        c ^= a;
        d ^= b;
        b ^= c;
        a ^= d;
        c ^= t;
        d = (d << 11) | (d >>> 21);
        return this.generateRange((r >>> 0) / 4294967296, min, max);
    };
    return Seed;
}());
exports.Seed = Seed;
