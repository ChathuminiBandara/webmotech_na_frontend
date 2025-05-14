import ApiService from "../service/apiService";

export async function categoriesGetAll(data) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = false;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `category/find-all-category?onlySecondLayerCategory=${data}&onlyActiveStatus=true`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function subCategoriesGetAll(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `category/get-all/sub-categories?onlyActiveStatus=true`;
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}


export async function getCategoryBySlugDetails(slug, category) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = `category/find-by-slug/${slug}?type=${category.toUpperCase()}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

