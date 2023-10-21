"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prismaClientValidationError(err) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    if (err.message.includes("is missing.")) {
        const error = {
            name: "Argument is missing",
            path: {
                path: (_d = (_c = (_b = (_a = err.message) === null || _a === void 0 ? void 0 : _a.split("Argument")[1]) === null || _b === void 0 ? void 0 : _b.split("` ")[0]) === null || _c === void 0 ? void 0 : _c.replace(" `", "")) === null || _d === void 0 ? void 0 : _d.trim(),
                message: (_f = (_e = err === null || err === void 0 ? void 0 : err.message) === null || _e === void 0 ? void 0 : _e.split("})")[1]) === null || _f === void 0 ? void 0 : _f.trim(),
            },
            message: ((_k = (_j = (_h = (_g = err.message) === null || _g === void 0 ? void 0 : _g.split("Argument")[1]) === null || _h === void 0 ? void 0 : _h.split("` ")[0]) === null || _j === void 0 ? void 0 : _j.replace(" `", "")) === null || _k === void 0 ? void 0 : _k.trim()) + " argument is missing",
            statusCode: 400,
        };
        return error;
    }
    else {
        const error = {
            name: "Invalid type",
            path: {
                path: err.message.split("Argument")[1].split("` ")[0].split("`")[1],
                message: (_o = (_m = (_l = err.message) === null || _l === void 0 ? void 0 : _l.split("})")[1]) === null || _m === void 0 ? void 0 : _m.split(" Invalid value provided. ")[1]) === null || _o === void 0 ? void 0 : _o.trim(),
            },
            message: (_q = (_p = err === null || err === void 0 ? void 0 : err.message) === null || _p === void 0 ? void 0 : _p.split("})")[1]) === null || _q === void 0 ? void 0 : _q.trim(),
            statusCode: 400,
        };
        return error;
    }
}
exports.default = prismaClientValidationError;
