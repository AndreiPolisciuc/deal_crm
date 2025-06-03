export interface Status {
    id: number;
    name: string;
    created_at:string;
    active:boolean;
    sort: number;
    color:string;
}

export interface StatusInput {
    name: string;
    sort: number;
    color:string;
}

export interface StatusInputEdit {
    id: number;
    name: string;
    active:boolean;
    sort: number;
    color:string;
}