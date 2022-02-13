import express from "express";
import Post from "./route/post";
import fs from "fs";
import path from "path";

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", Post);

app.listen(port, () => console.log(`on Server\nPort : ${port}`));
