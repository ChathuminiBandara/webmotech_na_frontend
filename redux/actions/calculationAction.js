export const setTotal = (total) => {
    return {
        type: 'SET_TOTAL',
        payload: total,
    };
};

export const setDiscountedAmount = (discountedAmount) => {
    return {
        type: 'SET_DISCOUNTED_AMOUNT',
        payload: discountedAmount,
    };
};
