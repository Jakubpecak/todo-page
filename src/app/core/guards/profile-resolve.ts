import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';


@Injectable()
export class ProfileResolve implements Resolve<User | null> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth.getCurrentUser();
    }

    constructor(private auth: AuthService){}
}