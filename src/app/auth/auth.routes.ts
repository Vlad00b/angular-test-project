import {Routes} from "@angular/router";
import {ROUTES_NAMES} from "../shared/constants/routes-names.constant";
import {AuthComponent} from "./auth.component";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: ROUTES_NAMES.auth.login,
                loadComponent: () => import('./pages/login/login.component')
            },
            {
                path: ROUTES_NAMES.auth.registration,
                loadComponent: () => import('./pages/registration/registration.component')
            },
            {
                path: '',
                redirectTo: ROUTES_NAMES.auth.login,
                pathMatch: 'full'
            }
        ]
    }
]
