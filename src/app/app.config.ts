import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {APP_ROUTES} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {MainInterceptor} from "./shared/interceptors/main.interceptor";
import {ErrorInterceptor} from "./shared/interceptors/error.interceptor";
import {provideToastr} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(APP_ROUTES),
        provideAnimations(),
        provideToastr(),
        provideHttpClient(withInterceptors([MainInterceptor, ErrorInterceptor]))
    ]
};
