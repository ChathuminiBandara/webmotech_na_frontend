import { CART_LIST } from "../../util/constants";


const initialState = {
    updateCart: 0, // Set initial cart length to 0 or a suitable default
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            if (typeof window !== "undefined") {
                const cartItems = localStorage.getItem(CART_LIST) ? JSON.parse(localStorage.getItem(CART_LIST)) : [];
                const cartLength = cartItems.length;
                console.log(cartLength)
                return {
                    ...state,
                    updateCart: cartLength,
                };
            }
            return state; // Return current state if window is not defined
        default:
            return state;
    }
};

export default cartReducer;
