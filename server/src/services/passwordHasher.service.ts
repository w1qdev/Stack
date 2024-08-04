import bcrypt from "bcrypt";

class PasswordHasher {
    public async generateHashedPassword(password: string): Promise<string> {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, passwordSalt);

        return passwordHash;
    }

    public async comparePasswords(
        inComingPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        const isMatch = await bcrypt.compare(inComingPassword, hashedPassword);

        return isMatch;
    }
}

export const passwordService = new PasswordHasher();
