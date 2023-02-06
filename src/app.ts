import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import brand from "./routes/Brand";
import group from "./routes/Group";
import product from "./routes/Product";
import city from "./routes/City";
import client from "./routes/Client";
import company from "./routes/Company";
import inventory from "./routes/Inventory";
import item from "./routes/Item";
import log from "./routes/Log";
import seller from "./routes/Seller";
import sell from "./routes/Sell";
import state from "./routes/State";
import transaction from "./routes/Transaction";
import user from "./routes/User";
import measurement from "./routes/Measurement";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/brand", brand);
app.use("/city", city);
app.use("/client", client);
app.use("/company", company);
app.use("/group", group);
app.use("/inventory", inventory);
app.use("/measurement", measurement);
app.use("/item", item);
app.use("/log", log);
app.use("/product", product);
app.use("/seller", seller);
app.use("/sell", sell);
app.use("/state", state);
app.use("/transaction", transaction);
app.use("/user", user);

export default app;
