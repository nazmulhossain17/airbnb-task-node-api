const mongoose = require("mongoose");
const app = require("./src/app");
const { dbURL } = require("./src/config");
const port = 5000;

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(dbURL);
    console.log("Database Connected!");
    app.listen(port, () => {
      console.log(`Server running on PORT ${port}`);
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

connectDB();
