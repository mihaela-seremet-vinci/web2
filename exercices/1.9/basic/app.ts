import express from "express";



import textsRouter from "./routes/texts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//1.2
let requestCount = 0;
app.use((req, _res, next) => {
  if (req.method === "GET") {
    requestCount++;
    console.log(`GET counter : ${requestCount}`);
  }
  next();
});
//end1.2
app.use("/texts", textsRouter);

export default app;
