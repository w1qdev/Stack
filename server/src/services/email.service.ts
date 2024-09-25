import nodemailer from "nodemailer";

type messageBodyType = {
    to: string;
    subject: string;
    text: string;
};

type emailAuthOptionsType = {
    user: string;
    pass: string;
};

class EmailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "",
                pass: "",
            },
        });
    }

    public async sendMessage(messageBody: messageBodyType) {
        await this.transporter.sendMail({
            from: "reebok.comg@gmail.com",
            to: messageBody.to,
            subject: messageBody.subject,
            text: messageBody.text,
        });
    }
}

export const emailService = new EmailService();
