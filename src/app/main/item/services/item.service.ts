import {Injectable} from '@angular/core';
import {ItemApiService} from "./item-api.service";
import {PopupService} from "../../../shared/services/popup.service";
import {catchError, concatMap, defer, iif, map, Observable, of, tap} from "rxjs";
import {APP_TEXT} from "../../../shared/constants/text.constant";
import {Item} from "../types/item.type";
import {EditItemPopupComponent} from "../components/edit-item-popup/edit-item-popup.component";

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(
        public api: ItemApiService,
        private popupService: PopupService
    ) {
    }

    public editItemData(item: Item): Observable<Item | null> {
        return this.popupService.showCustomPopup<EditItemPopupComponent, Item, Pick<Item, 'name' | 'type'>>(EditItemPopupComponent, item)
            .pipe(
                concatMap((newItem) => {
                    if (newItem) {
                        return this.api.editItem(item.id, newItem)
                            .pipe(catchError(() => [null]));
                    }
                    return [null];
                })
            )
    }

    public deleteItemById(id: string): Observable<boolean> {
        return this.popupService.showConfirmPopup({
            header: APP_TEXT.deleteItem,
            message: APP_TEXT.deleteThisItem,
            okBtnText: APP_TEXT.delete
        })
            .pipe(
                concatMap((remove) => iif(
                    () => remove,
                    defer(() => this.api.deleteItem(id)
                        .pipe(
                            map(() => true),
                            catchError(() => [false])
                        )
                    ),
                    defer(() => of(false))
                ))
            )
    }
}
