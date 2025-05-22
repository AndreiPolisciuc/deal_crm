export interface TypeOfWork {
    id: number;
    name: string;
    text: string;
    created_at:string;
    active:boolean;
    sort: number;
}

export interface TypeOfWorkInput {
    name: string;
    text: string;
    sort: number;
}

export interface TypeOfWorkInputEdit {
    id: number;
    name: string;
    text: string;
    active:boolean;
    sort: number;
}