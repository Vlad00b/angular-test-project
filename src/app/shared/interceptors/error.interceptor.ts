import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthApiService} from "../../auth/services/auth-api.service";

export function ErrorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
    const authService = inject(AuthApiService);
    return next(req.clone())
        .pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    console.log(err);
                    if (err.status === 401) {
                        authService.signOut();
                    }
                }
                return throwError(() => err);
            })
        )
}
