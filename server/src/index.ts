import express from "express";
import { router } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api/user", router.userRouter);
app.use("/api/groups", router.groupRouter);

app.listen(5000, () => {
    console.log(`server has been started...`);
});
