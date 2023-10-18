"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prismaClientKnownRequestError(err) {
    var _a, _b;
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
        error.message = (err.message).trim();
        error.path = {
            path: ((_a = err.meta) === null || _a === void 0 ? void 0 : _a.target).join("/ "),
            message: "Unique constraint failed on the fields: " +
                ((_b = err.meta) === null || _b === void 0 ? void 0 : _b.target).join("/ "),
        };
    }
    return error;
}
exports.default = prismaClientKnownRequestError;
