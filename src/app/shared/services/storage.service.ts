import {Injectable} from '@angular/core';
import {StorageKeys} from "../enums/storage-keys.enum";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    public setToStorage(key: StorageKeys, value: any): void {
        const data = typeof value !== 'string' ? JSON.stringify(value) : value;
        localStorage.setItem(key, data)
    }

    public getToken(): string {
        return localStorage.getItem(StorageKeys.token) ?? '';
    }

    public clearStorage(): void {
        localStorage.clear();
    }
}
