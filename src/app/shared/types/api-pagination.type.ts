export type ApiPagination<T> = {
    total: number;
    page: number;
    data: T;
}
