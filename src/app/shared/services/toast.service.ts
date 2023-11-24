import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {APP_TEXT} from "../constants/text.constant";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastrService: ToastrService) {
    }

    public showSuccessToast(message: string): void {
      this.toastrService.success(message, APP_TEXT.success)
    }

    public showErrorToast(message: string): void {
      this.toastrService.error(message, APP_TEXT.error)
    }
}
