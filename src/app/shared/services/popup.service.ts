import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PopupData} from "../types/popup-data.type";
import {Observable} from "rxjs";
import {ConfirmPopupComponent} from "../components/confirm-popup/confirm-popup.component";
import {ComponentType} from "@angular/cdk/portal";

@Injectable({
    providedIn: 'root',
})
export class PopupService {

    constructor(private dialog: MatDialog) {
    }

    public showCustomPopup<C, D, R>(component: ComponentType<C>, data?: D): Observable<R> {
        const config: MatDialogConfig = {disableClose: true};
        if (data) {
            config.data = data;
        }
        const popup = this.dialog.open(component, config);
        return popup.afterClosed();
    }

    public showConfirmPopup(data: Partial<PopupData>): Observable<boolean> {
        return this.showCustomPopup<ConfirmPopupComponent, typeof data, boolean>(ConfirmPopupComponent, data);
    }
}
