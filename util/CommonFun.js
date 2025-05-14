import {AlertTriangle, Check, X} from "react-feather";
import {Slide, toast, ToastContainer} from "react-toastify";
import Cookies from "js-cookie";
import * as constant from "../util/constants";

export const validateInputs = (inputValue, validationTopics) => {
    const validationFunctions = {
        isEmpty: value => !value.trim(),
        isEmail: value =>
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        isPasswordValid: value => value.length < 8, // Adjust this according to your password validation criteria
    };

    const errorMessages = {
        isEmpty: 'This field cannot be empty',
        isEmail: 'Please enter a valid email address',
        isPasswordValid: 'Password must be at least 8 characters long', // Adjust this according to your password validation criteria

    };


    for (const topic of validationTopics) {
        const validationFunction = validationFunctions[topic];
        const errorMessage = errorMessages[topic];
        if (validationFunction && validationFunction(inputValue)) {
            return {errorMessage, isValid: false}; // Validation failed, return error message and status
        }
    }

    return {errorMessage: null, isValid: true};
};

export const customSweetAlert = (
    text,
    type,
    buttonEvent,
    textInputProps,
    title
) => {
    let msgType = "warning";
    if (type === 2) {
        msgType = "info";
    } else if (type === 0) {
        msgType = "error";
    } else if (type === 1) {
        msgType = "success";
    } else if (type === 3) {
        msgType = "warning";
    }

    return MySwal.fire({
        title,
        text,
        icon: msgType,
        showCancelButton: true,
        confirmButtonText: "Yes",
        customClass: {
            confirmButton: "btn btn-primary mr-2 mx-2",
            cancelButton: "btn btn-outline-danger mx-2",
            content: "pt-1 pb-1",
            input: "mb-1 form-control alert-input-label",
            inputLabel: "mt-2 font-weight-bold",
        },
        buttonsStyling: false,
        input: textInputProps && textInputProps.enabled ? "textarea" : null,
        inputLabel: textInputProps ? textInputProps.inputLabel : null,
        inputPlaceholder: textInputProps ? textInputProps.placeholder : null,
        inputValidator: (value) => {
            if (!value) {
                return textInputProps.errorMsg;
            }
        },
    }).then(function (result) {
        if (result.value) {
            buttonEvent(result.value);
        }
    });
};

export const customToastMsg = (e, type, c) => {
    let msgType = "info";
    let assets = {
        color: "bg-info",
        icon: <AlertTriangle color={"#3f3d3d"} size={15}/>,
    };
    if (type === 2) {
        msgType = "info";
        assets = {
            color: "bg-warning",
            icon: <AlertTriangle color={"#3f3d3d"} size={15}/>,
        };
    } else if (type === 0) {
        msgType = "error";
        assets = {
            color: "bg-danger",
            icon: <X size={15} color={"#680000"}/>,
        };
    } else if (type === 1) {
        msgType = "success";
        assets = {
            color: "bg-success",
            icon: <Check color={"#10df10"} size={15}/>,
        };
    }
    console.log('customToastMsg called with:', {e, type, c});
    toast[msgType](e, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true, transition: Slide,
        theme: "light",
    });
};


export const logout = () => {
    Cookies.remove(constant.ACCESS_TOKEN);
    Cookies.remove(constant.REFRESH_TOKEN);
    Cookies.remove(constant.Expire_time);
    Cookies.remove(constant.USER_PROFILE);
    Cookies.remove("Eligible")
    localStorage.removeItem(constant.CART_LIST)
    window.location.href = '/signin'
}


export const formatPrice = (value) => {
    const formattedValue = parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return 'LKR ' + formattedValue;
};
export const findDiscountedPrice = (prodPrice, prodDiscount) => {
    return prodPrice - (prodPrice / 100) * prodDiscount

};


export const removeSlashes = (str) => {
    let val = str.split('/')
    console.log(val)
    return val[1];
}

export const handleError = (c) => {
    let msg = c?.response?.data?.message
    console.log(c.message)
    c?.response?.data?.message
        ? customToastMsg(c?.response?.data?.message, 0) : c?.message ? customToastMsg(c.message, 0)
            : customToastMsg("Sorry! Try again later", 0);
};