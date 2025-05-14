import {CART_LIST} from "@/util/constants";

const initialState = {
    isLoading: false,
};

const tourReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_TOUR':
            if (typeof window !== "undefined") {
                const cartItems = localStorage.getItem('help') ? localStorage.getItem('help') : false;
                const cartLength = cartItems.length;
                console.log(cartLength)
                return {
                    ...state,
                    updateCart: cartLength,
                };
            }
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

export default tourReducer;