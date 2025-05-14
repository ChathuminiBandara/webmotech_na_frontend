import ApiService from "../service/apiService";

export async function placeOrderAsPackage(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = 'order';
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}

export async function seylanGateWay(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = 'seylan/wibmo/pay';
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}

export async function getAllOrderUsingUser() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `order/find/my-order-history`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function getAllPaymentAndDeliveryMethod() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `order/payment-and-delivery/options`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function orderDetailsGetById(id) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `order/${id}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function orderResponseGetById(id) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `order/order-response/${id}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function orderPaymentMethodUpdateIntoCOD(data) {
    const apiObject = {};
    apiObject.method = 'PATCH';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `order/update/payment-method/${data.orderId}?paymentMethodId=${data.paymentMethod}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
