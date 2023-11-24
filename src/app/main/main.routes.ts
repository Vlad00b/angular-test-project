import {Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {ROUTES_NAMES} from "../shared/constants/routes-names.constant";

export const MAIN_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: ROUTES_NAMES.main.items,
                loadChildren: () => import('./item/item.routes').then(r => r.ITEM_ROUTES)
            },
            {
                path: '',
                redirectTo: ROUTES_NAMES.main.items,
                pathMatch: 'full'
            }
        ]
    }
]
