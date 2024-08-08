class Validator {
    public validatePassword(password: string): boolean {
        const regex = /^(?=.*\d).{8,}$/;

        return regex.test(password);
    }

    public validateEmail(email: string): boolean {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(email);
    }
}

export const validator = new Validator();
