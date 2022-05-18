const express = require("express");
const colors = require("colors");
const app = express();
const dotenv = require("dotenv").config();
// it will allow us to use the env variables from file
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
connectDB();
/* A middleware that allows us to use the body of the request. */
app.use(express.json());
/* A middleware that allows us to use the body of the request. */
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
