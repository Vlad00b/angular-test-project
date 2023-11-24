import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";

export function MainInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
    const storage = inject(StorageService);
    const token = storage.getToken();
    const clone = req.clone({
        setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return next(clone);
}
