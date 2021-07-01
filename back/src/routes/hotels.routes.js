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
    app.get("/hoteis",verifyToken, controller.getHoteis);
    app.get("/hoteisPage",verifyToken, controller.getHoteisPage);
    app.get("/rooms",verifyToken, controller.getRooms);
    app.get("/roomsPage",verifyToken, controller.getRoomsPage);
    app.get("/hotel/:id",verifyToken,controller.getHotel);
    app.get("/hotelRooms/:id",verifyToken,controller.getRoomsFromHotel);
    app.get("/room/:id",verifyToken,controller.getRoom);
    app.get("/reservations", verifyToken, controller.getReservations);
    app.post("/reservations", verifyToken, controller.newReservations);
};