import { Injectable } from "@angular/core";
import { LocalhostKeys } from "../enum/localhost-keys";

@Injectable()
export class AuthenticationService {

    userName: string = '';

    constructor() { }

    setUserName(userName: string) {
        this.userName = userName;
        localStorage.setItem(LocalhostKeys.USERNAME, userName);
    }

    getUserName() {
        const userName = localStorage.getItem(LocalhostKeys.USERNAME);
        if (userName) {
            return userName;
        }
        return '';
    }

}