const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

// route logic

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
