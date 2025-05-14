import ApiService from "@/service/apiService";

export async function trackOrderDetailsByOrderId(id) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `order/track-order/${id}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
