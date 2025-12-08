export interface PaginationQuery {
    page?: string | string[];
    limit?: string | string[];
}
export interface PaginationMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

 const parseNumber = (value: string | string[] | undefined, fallback: number) => {
        if (Array.isArray(value)) {
            value = value[0];
        }
        const parsed = value ? parseInt(value, 10) : NaN;
        return Number.isNaN(parsed) || parsed < 1 ? fallback : parsed;
    };

export const getPagination = (query: PaginationQuery,
    totalItems: number): PaginationMeta & { skip: number } => {
    const page = parseNumber(query.page, 1);
    const limit = parseNumber(query.limit, 10);
    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        totalItems,
        totalPages,
        skip
    };
}