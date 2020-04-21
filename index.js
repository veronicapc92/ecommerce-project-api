const womenProductTypes = require("./routes/womenProductTypes");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/womenProductTypes", womenProductTypes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
