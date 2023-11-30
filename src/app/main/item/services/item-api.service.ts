import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AddItemForm, Item, ItemStatistic} from "../types/item.type";
import {APP_CONST} from "../../../shared/constants/common.constant";
import {API_URL} from "../../../shared/constants/api-url.constant";
import {ApiResponse} from "../../../shared/types/api-response.type";
import {ApiPagination} from "../../../shared/types/api-pagination.type";
import {ERROR_MESSAGES} from "../../../shared/constants/text.constant";
import {ToastService} from "../../../shared/services/toast.service";

@Injectable({
    providedIn: 'root'
})
export class ItemApiService {

    constructor(
        private http: HttpClient,
        private toastService: ToastService
    ) {
    }

    public getItems(page: number = 1, limit: number = APP_CONST.itemsLimit): Observable<ApiPagination<Item[]>> {
        return this.http.get<ApiResponse<ApiPagination<Item[]>>>(API_URL.item.items, {params: {page, limit}})
            .pipe(map((res) => {
                if (res.success && res.data) {
                    return res.data;
                }
                this.toastService.showErrorToast(ERROR_MESSAGES.somethingWentWrong)
                throw new Error(ERROR_MESSAGES.somethingWentWrong);
            }))
    }

    public addNewItem(data: Record<keyof AddItemForm, string>): Observable<boolean> {
        return this.http.post<ApiResponse<undefined>>(API_URL.item.items, data)
            .pipe(map((res) => {
                if (res.success) {
                    return true;
                }
                this.toastService.showErrorToast(ERROR_MESSAGES.somethingWentWrong)
                throw new Error(ERROR_MESSAGES.somethingWentWrong);
            }))
    }

    public editItem(id: string, item: Partial<Item>): Observable<Item> {
        return this.http.put<ApiResponse<Item>>(API_URL.item.edit(id), item)
            .pipe(map((res) => {
                if (res.success && res.data) {
                    return res.data;
                }
                this.toastService.showErrorToast(ERROR_MESSAGES.somethingWentWrong)
                throw new Error(ERROR_MESSAGES.somethingWentWrong);
            }))
    }

    public deleteItem(id: string): Observable<boolean> {
        return this.http.delete<ApiResponse<undefined>>(API_URL.item.edit(id))
            .pipe(map((res) => {
                if (res.success) {
                    return true;
                }
                this.toastService.showErrorToast(ERROR_MESSAGES.somethingWentWrong)
                throw new Error(ERROR_MESSAGES.somethingWentWrong);
            }))
    }

    public getStatistic(page: number = 1, limit: number = APP_CONST.itemsStatisticLimit): Observable<ApiPagination<ItemStatistic[]>> {
        return this.http.get<ApiResponse<ApiPagination<ItemStatistic[]>>>(API_URL.item.statistic, {params: {page, limit}})
            .pipe(map((res) => {
                if (res.success && res.data) {
                    return res.data;
                }
                this.toastService.showErrorToast(ERROR_MESSAGES.somethingWentWrong)
                throw new Error(ERROR_MESSAGES.somethingWentWrong);
            }))
    }
}
