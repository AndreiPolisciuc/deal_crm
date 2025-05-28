export interface PlanInformation {
    id: number;
    plan_id:number;
    type_of_work_id:number;
    text: string;
    name: string;
    created_at:string;
    active:boolean;
    file: null | File | string | undefined
    type_of_file: string;
}

export interface PlanInformationInputAdd {
    name: string;
    plan_id:number;
    text:string;
    file: null | File | string | undefined
    type_of_file: string;
    type_of_work_id:number;
}

export interface PlanInformationInputEdit {
    id: number;
    name: string;
    active:boolean;
    construction_id:number;
}