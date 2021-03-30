require("dotenv").config({});
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const mainRoutes = require("./src/routes/");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", mainRoutes);

app.listen(port, () => {
  console.log(`Server Running in Port ${port}`);
});
