import db from '../database/cookingrecipe';
import Sequelize from 'sequelize'
import {ErrorGeneral} from '../description/description';

export class RoomController {
    // createRoom(req: any, res: any, next: any) {
    //     const body = req.body;

    //     db.Room.create({
    //         name: body.name
    //     }).then(rs => {
    //         if (rs) {
    //             return res.status(200).send({
    //                 status: 1,
    //                 description: 'Ok'
    //             })
    //         }
    //     }).catch(error => {
    //         ErrorGeneral(error, 200, req, res, next);
    //     })

    // }

    // createParticipant(req:any, res:any, next:any){
    //     const body = req.body;

    //     db.Participant.create({
    //         accountId: body.accountId,
    //         roomId: body.roomId,
    //         type: body.type === undefined ? 'single' : body.type
    //     }).then(rs => {
    //         if (rs) {
    //             return res.status(200).send({
    //                 status: 1,
    //                 description: 'Ok'
    //             })
    //         }
    //     }).catch(error => {
    //         ErrorGeneral(error, 200, req, res, next);
    //     })

    // }
}