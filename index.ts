import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import brand from "./routes/brands";
import group from "./routes/groups";
import product from "./routes/products";
import city from "./routes/citys";
import client from "./routes/clients";
import company from "./routes/company";
import inventory from "./routes/inventory";
import item from "./routes/items";
import log from "./routes/logs";
import seller from "./routes/sellers";
import sell from "./routes/sells";
import state from "./routes/states";
import transaction from "./routes/transactions";
import user from "./routes/users";
import measurement from "./routes/measurements";

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
