
const initialState = {
    total: 0,
    discountedAmount: 0,
};


const totalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOTAL':
            return {
                ...state,
                total: action.payload,
            };
        case 'SET_DISCOUNTED_AMOUNT':
            return {
                ...state,
                discountedAmount: action.payload,
            };
        default:
            return state;
    }
};

export default totalReducer;
