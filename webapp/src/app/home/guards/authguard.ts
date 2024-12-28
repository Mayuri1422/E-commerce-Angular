import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot } from "@angular/router";
import { map } from "rxjs";
import { UserService } from "../services/user/user-service.service";

export const authGuard = (next: ActivatedRouteSnapshot) => {
    return inject(UserService).isUserauthenticated$.pipe(
        map(isAuthenticated => isAuthenticated ? true : createUrlTreeFromSnapshot(
            next, ['/', 'home', 'login']
        ))
    )
}