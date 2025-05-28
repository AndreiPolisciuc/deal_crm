export interface Status {
    id: number;
    name: string;
    created_at:string;
    active:boolean;
    sort: number;
}

export interface StatusInput {
    name: string;
    sort: number;
}

export interface StatusInputEdit {
    id: number;
    name: string;
    active:boolean;
    sort: number;
}