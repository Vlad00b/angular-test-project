import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";
import {ROUTES_NAMES} from "../constants/routes-names.constant";

@Injectable({
    providedIn: 'root'
})
export class GuardService {

    constructor(
        private storageService: StorageService,
        private router: Router
    ) {
    }

    public checkAuth(): boolean {
        const token = this.storageService.getToken();
        if (!token) {
            this.router.navigate(['/', ROUTES_NAMES.auth.auth]);
            return false;
        }
        return true;
    }
}
