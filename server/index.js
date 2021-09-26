const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");
require("./db/connect");
app.use(express.json());

// Routers
app.use("/api", require("./routes/text-dev"));
app.use(require("./routes/text-client"));

app.listen(PORT, () => console.log(`Up on port ${PORT}`));
