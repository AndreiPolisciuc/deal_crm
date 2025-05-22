export interface Plan {
    id: number;
    construction_id:number;
    name: string;
    created_at:string;
    active:boolean;
}

export interface PlanInputAdd {
    name: string;
    construction_id:number;
}

export interface PlanInputEdit {
    id: number;
    name: string;
    active:boolean;
    construction_id:number;
}