"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrayToNestedProperty = (obj, path, value) => {
    path.reduce((acc, key, i) => {
        if (acc[key] === undefined)
            acc[key] = {};
        if (i === path.length - 1)
            acc[key] = value;
        return acc[key];
    }, obj);
};
exports.default = arrayToNestedProperty;
