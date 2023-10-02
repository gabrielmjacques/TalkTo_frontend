import { IRoomModel } from "../Interfaces/IRoomModel";

export class RoomModel implements IRoomModel {
    roomName: string;
    roomDescription: string;
    users: Array<object>;

    constructor(roomName: string, roomDescription: string, users: Array<object>) {
        this.roomName = roomName;
        this.roomDescription = roomDescription;
        this.users = users;
    }
}