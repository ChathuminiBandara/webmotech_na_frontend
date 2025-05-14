import ApiService from "@/service/apiService";

export async function getSubProductDetailsById(id) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `sub-product/${id}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
