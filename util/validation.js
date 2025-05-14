export const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
};

export const validatePassword = (password) => {
    const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~\-={}[\]:";'<>?,./]).{8,}$/;
    return pattern.test(password);
};