import ApiService from "../service/apiService";

export async function getAllCities() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = false;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = 'cities/get-all-cities';
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
