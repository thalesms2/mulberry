import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import brand from "./routes/Brands";
import group from "./routes/Groups";
import product from "./routes/Products";
import city from "./routes/Citys";
import client from "./routes/Clients";
import company from "./routes/Company";
import inventory from "./routes/Inventory";
import item from "./routes/Items";
import log from "./routes/Logs";
import seller from "./routes/Sellers";
import sell from "./routes/Sells";
import state from "./routes/States";
import transaction from "./routes/Transactions";
import user from "./routes/Users";
import measurement from "./routes/Measurements";

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

const port = process.env.PORT || 4000;
app.listen(port, () =>
    console.log(`🚀 Server ready at: http://localhost:${port}`)
);
