"use strict"
module.exports = function(app) {
  var cakeList = require("../controllers/cakeListController")

  // cakeList Routes
  app
    .route("/cakes")
    .get(cakeList.list_all_cakes)
    .post(cakeList.create_a_cake)

  app
    .route("/cakes/:cakeId")
    .get(cakeList.read_a_cake)
    .put(cakeList.update_a_cake)
    .delete(cakeList.delete_a_cake)
}
