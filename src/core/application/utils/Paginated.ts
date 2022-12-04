interface PaginatedParams<T> {
    size: number;
    page: number;
    count: number;
    data: T[];
}

export class Paginated<T> {
    
    public data: T[];
    public totalRecords: number;
    public pageSize: number;
    public totalPages: number;
    public currentPage: number;

    static create<T>(params: PaginatedParams<T>): Paginated<T> {
        const response: Paginated<T> = {
            data: params.data,
            currentPage: params.page,
            pageSize: params.size,
            totalPages: Math.ceil(params.count / params.size),
            totalRecords: params.count
        };
        return response;
    }

    static getOffset(page:number, size: number) {
        return size * (page - 1);
    }

}