const path = require("path");
const express = require("express");
const colors = require("colors");
const app = express();
const dotenv = require("dotenv").config();
// it will allow us to use the env variables from file
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
connectDB();
/* A middleware that allows us to use the body of the request. */
app.use(express.json());
/* A middleware that allows us to use the body of the request. */
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}
app.use(errorHandler);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});