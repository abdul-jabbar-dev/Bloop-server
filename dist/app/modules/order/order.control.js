"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../../../db/prismaClient"));
const availableProviderDate = ({ providerId, bookingDate, }) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistProvider = yield prismaClient_1.default.serviceProvider.findUnique({
        where: { id: providerId },
        include: { servicePlaced: true },
    });
    if (!isExistProvider) {
        throw new Error("Provider id invalid");
    }
    const isAvailable = isExistProvider === null || isExistProvider === void 0 ? void 0 : isExistProvider.servicePlaced.find((servicePlace) => servicePlace.bookingDate === bookingDate);
    if (isAvailable) {
        return { isAvailable: false, assignment: isAvailable, isExistProvider };
    }
    else {
        return { isAvailable: true, isExistProvider };
    }
});
const createOrderDB = ({ orderData, oldServicePlacedData, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newServicePlacedData = Object.assign({}, oldServicePlacedData);
    let order = null;
    let servicePlaced = null;
    yield prismaClient_1.default.$transaction((asyncDB) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const orderedService = yield asyncDB.service.findUnique({
            where: {
                id: oldServicePlacedData.serviceId,
            },
        });
        if (!orderedService) {
            throw new Error("Invalid Service Data ");
        }
        const serviceProvider = yield asyncDB.serviceProvider.findFirst({
            include: { servicePlaced: true },
            where: {
                serviceType: { id: orderedService.serviceTypeId },
                servicePlaced: {
                    some: { NOT: { bookingDate: oldServicePlacedData.bookingDate } },
                },
            },
        });
        if (!serviceProvider) {
            throw new Error("No Worker available in " + oldServicePlacedData.bookingDate);
        }
        order = yield asyncDB.order.create({
            data: { subscriberId: orderData.subscriberId, cartId: orderData.cartId },
        });
        if (!order) {
            throw new Error("Failed to create order");
        }
        const isProviderAvailable = yield availableProviderDate({
            providerId: serviceProvider.id,
            bookingDate: oldServicePlacedData.bookingDate,
        });
        if (!isProviderAvailable.isAvailable) {
            throw new Error("Service provider not available in " +
                ((_a = isProviderAvailable.assignment) === null || _a === void 0 ? void 0 : _a.bookingDate));
        }
        newServicePlacedData["orderId"] = order.id;
        newServicePlacedData["serviceProviderId"] =
            isProviderAvailable.isExistProvider.id;
        console.log(newServicePlacedData);
        // order created
        // -----------------------------------------------------servicePlaced
        // console.log(order);
        servicePlaced = yield asyncDB.servicePlaced.create({
            data: newServicePlacedData,
        });
        if (!servicePlaced) {
            throw new Error("Internal server error! Order placed failed");
        }
        else {
            return { servicePlaced, order };
        }
    }));
    if (!order) {
        throw new Error("Order create failed");
    }
    if (!servicePlaced) {
        throw new Error("Order placed failed");
    }
    return { servicePlaced, order };
});
const findByCartDB = ({ cartId }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.order.findUnique({
        where: { cartId },
        include: {
            servicePlaced: { include: { payment: true, service: true, order: true } },
        },
    });
    return result;
});
const ConfirmPaymentDB = (confirmData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let order = null;
        yield prismaClient_1.default.$transaction((asyncDB) => __awaiter(void 0, void 0, void 0, function* () {
            var _b, _c, _d;
            order = yield asyncDB.order.findUnique({
                where: { id: confirmData.orderId },
                include: { servicePlaced: { include: { service: true } } },
            });
            if (!order) {
                throw new Error("No Order found try to valid order id ");
            }
            const makePayment = yield asyncDB.payment.create({
                data: {
                    price: (_c = (_b = order.servicePlaced) === null || _b === void 0 ? void 0 : _b.service.price) === null || _c === void 0 ? void 0 : _c.toString(),
                    status: (confirmData === null || confirmData === void 0 ? void 0 : confirmData.paymentMethod) === client_1.PaymentMethods.CashOnDelivery
                        ? "pending"
                        : "paid",
                    paymentMethod: confirmData.paymentMethod,
                    paymentVarificationCode: confirmData.paymentVarificationCode,
                    servicePlaced: { connect: { id: (_d = order.servicePlaced) === null || _d === void 0 ? void 0 : _d.id } },
                },
            });
            if (!makePayment) {
                throw new Error("internal server error payment failed");
            }
            const updateOrder = yield prismaClient_1.default.order.update({
                where: { id: order.id },
                data: { status: "booked" },
            });
            if (!updateOrder) {
                throw new Error("internal server error payment update");
            }
        }));
        if (!order) {
            throw new Error("internal server error! checkout failed");
        }
        return order;
    }
    catch (error) {
        return Promise.reject(error);
    }
});
const findMyOrderDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.order.findMany({
        where: { subscriber: { userId: user.id } },
        include: {
            feedback: true,
            servicePlaced: {
                include: { payment: true, service: true, serviceProvider: true },
            },
        },
    });
    return result;
});
const findProviderOrderDB = (user, isActive) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.order.findMany({
        include: {
            feedback: true,
            servicePlaced: {
                include: { payment: true, service: true, serviceProvider: true, order: true },
            },
        },
        where: {
            servicePlaced: {
                serviceProviderId: user.serviceProvider.id,
            },
            status: isActive,
        },
        orderBy: { servicePlaced: { createdAt: "desc" } },
    });
    return result;
});
const completeOrderDB = (orderId, provider) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prismaClient_1.default.order.findUnique({
        where: { id: orderId, servicePlaced: { serviceProviderId: provider.id } },
    });
    if (!order) {
        throw new Error("Invalid Order");
    }
    const updateOrder = yield prismaClient_1.default.order.update({
        where: { id: order.id },
        data: { status: "finish" },
    });
    if (!updateOrder) {
        throw new Error("Failed to completed order");
    }
    return updateOrder;
});
const OrderControl = {
    createOrderDB,
    availableProviderDate,
    findByCartDB,
    ConfirmPaymentDB,
    findMyOrderDB,
    findProviderOrderDB,
    completeOrderDB,
};
exports.default = OrderControl;
