import {Injectable} from '@angular/core';
import {StorageService} from "../../shared/services/storage.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ROUTES_NAMES} from "../../shared/constants/routes-names.constant";
import {map, Observable} from "rxjs";
import {AuthForm, AuthResponse} from "../types/auth.type";
import {ApiResponse} from "../../shared/types/api-response.type";
import {API_URL} from "../../shared/constants/api-url.constant";
import {ToastService} from "../../shared/services/toast.service";
import {StorageKeys} from "../../shared/enums/storage-keys.enum";
import {APP_TEXT, ERROR_MESSAGES} from "../../shared/constants/text.constant";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    constructor(
        private storageService: StorageService,
        private http: HttpClient,
        private toastService: ToastService,
        private router: Router
    ) {
    }

    public signIn(payload: Record<keyof AuthForm, string>): Observable<AuthResponse> {
        return this.http.post<ApiResponse<AuthResponse>>(API_URL.auth.login, payload)
            .pipe(
                map((res) => {
                    if (res.success && res.data) {
                        this.toastService.showSuccessToast(APP_TEXT.authorizationSuccess);
                        this.storageService.setToStorage(StorageKeys.token, res.data.token);
                        this.storageService.setToStorage(StorageKeys.user, res.data.user);
                        this.router.navigate(['/', ROUTES_NAMES.main.main], {replaceUrl: true});
                        return res.data;
                    }
                    this.toastService.showErrorToast(ERROR_MESSAGES.somethingWentWrong);
                    throw new Error(ERROR_MESSAGES.somethingWentWrong);
                })
            )
    }

    public signUp(payload: Record<keyof AuthForm, string>): Observable<AuthResponse> {
        return this.http.post<ApiResponse<AuthResponse>>(API_URL.auth.signUp, payload)
            .pipe(
                map((res) => {
                    if (res.success && res.data) {
                        this.toastService.showSuccessToast(APP_TEXT.registrationSuccess);
                        this.storageService.setToStorage(StorageKeys.token, res.data.token);
                        this.storageService.setToStorage(StorageKeys.user, res.data.user);
                        this.router.navigate(['/', ROUTES_NAMES.main.main], {replaceUrl: true});
                        return res.data;
                    }
                    this.toastService.showErrorToast(ERROR_MESSAGES.somethingWentWrong);
                    throw new Error(ERROR_MESSAGES.somethingWentWrong)
                })
            )
    }

    public signOut(): void {
        this.storageService.clearStorage();
        this.router.navigate(['/', ROUTES_NAMES.auth.auth], {replaceUrl: true});
    }
}
