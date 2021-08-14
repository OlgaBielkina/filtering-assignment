export interface Category {
    id: string;
    count: number;
    parent: string;
    name: string;
}

export interface Node {
    id: string;
    count: number;
    parent: string;
    name: string;
    children: Node[];
    selected: boolean;
}

export interface ApiResponse {
    data: {
        categories: Category[];
    };
}
