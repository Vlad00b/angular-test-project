import {Routes} from '@angular/router';
import {ROUTES_NAMES} from "./shared/constants/routes-names.constant";
import {inject} from "@angular/core";
import {GuardService} from "./shared/services/guard.service";

export const APP_ROUTES: Routes = [
    {
        path: ROUTES_NAMES.auth.auth,
        loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
    },
    {
        path: ROUTES_NAMES.main.main,
        canActivate: [() => inject(GuardService).checkAuth()],
        loadChildren: () => import('./main/main.routes').then(r => r.MAIN_ROUTES)
    },
    {
        path: '',
        redirectTo: ROUTES_NAMES.main.main,
        pathMatch: 'full'
    }
];
