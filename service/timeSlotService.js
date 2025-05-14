import ApiService from "@/service/apiService";

export async function getAllTimeSLots() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `order-time-slot`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
