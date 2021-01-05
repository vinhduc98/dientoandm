import { Express } from 'express';
import {RoomController} from '../controllers/room.controller';

export function RoomRouteNoauthenticate(url:string, app:Express){
    const room = new RoomController();
    // app.route(`${url}/createRoom`).post(room.createRoom);
    // app.route(`${url}/createParticipant`).post(room.createParticipant);
}