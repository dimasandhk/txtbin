const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
require("./db/connect");

app.listen(PORT, () => console.log(`Up on port ${PORT}`));
