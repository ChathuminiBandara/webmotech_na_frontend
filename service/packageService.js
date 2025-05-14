import ApiService from "../service/apiService";

export async function loadLimitedPackagesList() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = 'product-package?limit=5';
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}


export async function getAllStoreDetails(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `product-package/find-all`;
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}


export async function getPackageBySlugDetails(slug) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `product-package/find-by-slug/${slug}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function getAllProductToStore(data) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `Product/get-all-products?status=1&pages=${data.page}&limit=15&name=${data.search}&category=${data.category}&minPrice=${data.price[0]}&maxPrice=${data.price[1]}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function getPackageSizeDetailsBySlug(slug) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `product-package/find-by-slug/${slug}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
