export interface Company {
    id: number;
    name: string;
    text: string;
    created_at:string;
    active:boolean;
}

export interface CompanyInput {
    name: string;
    text: string;
}

export interface CompanyInputEdit {
    id: number;
    name: string;
    text: string;
    active:boolean;
}