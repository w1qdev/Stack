import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
        credentials: true,
    })
);

app.use("/api/user", router.userRouter);
app.use("/api/groups", router.groupRouter);

app.listen(5000, () => {
    console.log(`server has been started...`);
});
