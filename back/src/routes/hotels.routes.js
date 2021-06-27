const controller = require("../controllers/hotels.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // app.get("/hoteis", verifyToken, controller.getHoteis);
    app.get("/hoteis", controller.getHoteis);
    app.get("/hoteisPage", controller.getHoteisPage);
};