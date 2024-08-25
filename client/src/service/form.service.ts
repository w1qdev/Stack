export const Form = {
    validatePassword: (password: string) => {
        const regex = /^(?=.*\d).{8,}$/;

        return regex.test(password);
    },

    validateEmail: (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(email);
    },
};
