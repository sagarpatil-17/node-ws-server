import http from "http";
import express from "express";
import path from "path";

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve("public")));

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
})


server.listen(8080, () => {
    console.log('Server started at port 8080');
})