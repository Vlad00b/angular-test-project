import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {PopupData} from "../../types/popup-data.type";
import {APP_TEXT} from "../../constants/text.constant";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-confirm-popup',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule],
    templateUrl: './confirm-popup.component.html',
    styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent {
    public header?: string;
    public message!: string;
    public okText: string = APP_TEXT.ok;
    public cancelText: string = APP_TEXT.cancel;

    constructor(@Inject(MAT_DIALOG_DATA) data: Partial<PopupData>) {
        if (data) {
            if (data.message) {
                this.message = data.message;
            }
            if (data.header) {
                this.header = data.header;
            }
            if (data.okBtnText) {
                this.okText = data.okBtnText;
            }
            if (data.cancelBtnText) {
                this.cancelText = data.cancelBtnText;
            }
        }
    }
}
