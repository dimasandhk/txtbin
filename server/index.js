const express = require("express");
const app = express();
const moment = require("moment");

const PORT = process.env.PORT || 3000;
require("./db/connect");
app.use(express.json());

// Routers
app.use(require("./routes/text"));

app.listen(PORT, () => console.log(`Up on port ${PORT}`));
