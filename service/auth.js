import ApiService from './apiService';

export async function loginService(userCredentials) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.urlencoded = false;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = 'auth/email/login';
    apiObject.body = userCredentials;
    return await ApiService.callApi(apiObject);
}

z
export async function resetPasswordConfirmEmail(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = 'auth/forgot/password';
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}


export async function verifyOtpCodeWithEmail(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = 'auth/verify/otp';
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}


export async function resetPasswordWithHashCode(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = 'auth/reset/password';
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}


export async function changePassword(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.endpoint = 'auth/reset/password';
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}

export async function renewToken(token) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.urlencoded = false;
    apiObject.endpoint = 'auth/refresh';
    apiObject.body = token;
    apiObject.state = "refresh_token";
    return await ApiService.callApi(apiObject);
}


export async function verifyOtp(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = 'forgot-password/verify-otp';
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}


export async function requestOTP(email) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.urlencoded = false;
    apiObject.endpoint = 'forgot-password/request-otp';
    apiObject.body = email;
    return await ApiService.callApi(apiObject);
}

