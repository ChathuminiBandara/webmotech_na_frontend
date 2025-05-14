import ApiService from "../service/apiService";

export async function checkLocationCircle(data,outletDetails) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `outlet/check/circle-radius?longitude=${data.lng}&latitude=${data.lat}&outletId=${outletDetails}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function getAllOutletToDropdown() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `outlet`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}