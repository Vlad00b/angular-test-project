import {Routes} from "@angular/router";
import {ROUTES_NAMES} from "../../shared/constants/routes-names.constant";

export const ITEM_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/item-list/item-list.component')
            },
            {
                path: ROUTES_NAMES.main.statistics,
                loadComponent: () => import('./pages/item-statistic/item-statistic.component')
            }
        ]
    }
]
