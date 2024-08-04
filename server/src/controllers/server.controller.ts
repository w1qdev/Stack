import express, { Express } from "express";
// import { userRouter } from "../../routes/user.route.js";
import cors from "cors";

type startOptionsTypes = {
    isUseJson?: boolean;
};

type startCallback = (args?: string) => void;

export class Server {
    private app: Express;

    constructor(protected readonly options?: startOptionsTypes) {
        this.options = options;
        this.app = express();
    }

    public getApp(): any {
        return this.app;
    }

    public start(port: number, callback: startCallback): void {
        if (this.options?.isUseJson) {
            this.app.use(express.json());
        }

        this.app.listen(port, () => callback());
    }

    public useRoute(path: string, route: any): void {
        this.app.use(path, route);
    }

    public useCors(corsConfig?: object): void {
        const corsDefaultConfig = {
            origin: ["http://localhost:5173"],
            ...corsConfig,
        };

        this.app.use(cors(corsDefaultConfig));
    }
}
