"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRouteNoauthenticate = void 0;
const room_controller_1 = require("../controllers/room.controller");
function RoomRouteNoauthenticate(url, app) {
    const room = new room_controller_1.RoomController();
    // app.route(`${url}/createRoom`).post(room.createRoom);
    // app.route(`${url}/createParticipant`).post(room.createParticipant);
}
exports.RoomRouteNoauthenticate = RoomRouteNoauthenticate;
//# sourceMappingURL=room.route.js.map