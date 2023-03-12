const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/recipes_db", {
    //.connect("mongodb://mongoadmin:mongoadmin@localhost:27017/recipes_db?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Established a connection to the database"))
  .catch((err) =>
    console.log("Something went wrong when connecting to the database", err)
  );

module.exports = mongoose;
