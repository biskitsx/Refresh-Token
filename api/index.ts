// package import
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import morgan from "morgan"
import router from "./router";
import { deserializeUser } from "./middleware/deserializeUser";

function main() {
    // express app
    const app = express();

    // middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(morgan("dev"))
    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:3001",
        })
    );
    app.use(deserializeUser)
    // router
    app.use("/api", router)
    app.use(errorHandler);
    app.listen(3000, () => {
        console.log(`server start at 3000`);
    });
}

main();
