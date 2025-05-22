export interface Construction {
    id: number;
    company_id:number;
    name: string;
    text: string;
    location: string;
    created_at:string;
    active:boolean;
}

export interface ConstructionInputAdd {
    name: string;
    text: string;
    company_id:number;
    location:string;
}

export interface ConstructionInputEdit {
    id: number;
    name: string;
    text: string;
    active:boolean;
    company_id:number;
    location:string;
}