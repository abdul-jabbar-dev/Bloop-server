"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function zodValidator(err) {
    var _a, _b, _c, _d;
    const error = {
        message: ((_a = err === null || err === void 0 ? void 0 : err.issues[0]) === null || _a === void 0 ? void 0 : _a.path[1]) + " is " + (err === null || err === void 0 ? void 0 : err.issues[0].message),
        name: err === null || err === void 0 ? void 0 : err.name,
        statusCode: 400,
        path: {
            path: (_c = (_b = err.issues) === null || _b === void 0 ? void 0 : _b.map((er) => er === null || er === void 0 ? void 0 : er.path.join("/"))) === null || _c === void 0 ? void 0 : _c.join(", "),
            message: JSON.stringify((_d = err.issues) === null || _d === void 0 ? void 0 : _d.map((er) => { var _a; return (_a = ((er === null || er === void 0 ? void 0 : er.path.join("/")) + " is " + er.message)) === null || _a === void 0 ? void 0 : _a.trim(); })),
        },
    };
    return error;
}
exports.default = zodValidator;
