import express from "express";
import { config } from "./config/env.js";
import { connectToDB } from "./config/database.js";
import { createUserTable } from "./user/user.model.js";
import { accountTable } from "./account/account.model.js";
import { createDepositTable } from "./transaction/deposit/deposit.model.js";
import { transferTable } from "./transaction/transfer/transfer.model.js";
import { withdrawalTable } from "./transaction/withdrawal/withdrawal.model.js";
import { UserServices } from "./user/user.service.js";
import { userRouter } from "./user/user.routes.js";
import { AccountRouter } from "./account/account.routes.js";
import { transferRouter } from "./transaction/transfer/transfer.routes.js";
import { depositRouter } from "./transaction/deposit/deposit.routes.js";
import { withdrawalRouter } from "./transaction/withdrawal/withdrawal.routes.js";
import { GlobalError } from "./middlewares/error.js";
import cors from "cors";
import cookiePaser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

class Server {
  constructor() {
    this.useMiddlewares();
    this.addRoutes();
    this.listenServer();
    this.useErrorHandler();
  }
  useMiddlewares() {
    app.use(express.json());
    app.use(cookiePaser());
    app.use(
      cors({
        origin: process.env.FRONT_END_URL,
        methods: ["GET", "POST", "UPDATE", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );
  }
  addRoutes() {
    app.use("/users", userRouter);
    app.use("/accounts", AccountRouter);
    app.use("/transfer", transferRouter);
    app.use("/deposit", depositRouter);
    app.use("/withdrawal", withdrawalRouter);
  }
  useErrorHandler() {
    app.use(GlobalError.handleError);
  }
  async listenServer() {
    try {
      await connectToDB()
      app.listen(config.port, () => {
        // createUserTable();
        // accountTable();
        // createDepositTable();
        // transferTable();
        // withdrawalTable();
        // UserServices.altarTable()
        // Services.addColumn()
        console.log(`server running on http://localhost:${config.port}`);
      });
    } catch (error) {
      console.error("Server failed to start due to database connection error:", err.message);
      process.exit(1); // Exit the process gracefully if the DB connection fails
    }
  
  }
};

new Server();
