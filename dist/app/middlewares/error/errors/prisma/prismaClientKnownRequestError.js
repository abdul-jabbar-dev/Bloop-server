"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prismaClientKnownRequestError(err) {
    var _a, _b, _c, _d, _e;
    const error = {
        name: err.name,
        path: {
            path: "",
            message: "",
        },
        message: "",
        statusCode: 400,
    };
    if (err.code === "P2002") {
        error.message = (_a = (err === null || err === void 0 ? void 0 : err.message)) === null || _a === void 0 ? void 0 : _a.trim();
        error.path = {
            path: (_c = ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.target)) === null || _c === void 0 ? void 0 : _c.join("/ "),
            message: "Unique constraint failed on the fields: " +
                ((_e = ((_d = err === null || err === void 0 ? void 0 : err.meta) === null || _d === void 0 ? void 0 : _d.target)) === null || _e === void 0 ? void 0 : _e.join("/ ")),
        };
    }
    return error;
}
exports.default = prismaClientKnownRequestError;
