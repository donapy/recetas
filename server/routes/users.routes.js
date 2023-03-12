const userController = require("../controllers/users.controllers");

module.exports = (app) => {
  app.post("/api/register", userController.register);
  app.post("/api/login", userController.login);
  app.get("/api/isLoggedIn", userController.isLoggedIn);
  app.get("/api/logout", userController.logOutUser);
};
