const express = require("express");
const path = require("path");
const proxy = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  proxy({
    target: "http://10.60.43.40:20202",
    changeOrigin: true,
    pathRewrite: { "^/api": "" }
  })
);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(9000);
