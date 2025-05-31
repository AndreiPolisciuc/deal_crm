export interface House {
    id: number;
    construction_id:number;
    plan_id:number;
    name: string;
    created_at:string;
    active:boolean;
    street:string;
    unit:string;
    city:string;
    state:string;
    zip_code:string;
}

export interface HouseInputAdd {
    name: string;
    construction_id:number;
    plan_id:number | string;
    street:string;
    unit:string;
    city:string;
    state:string;
    zip_code:string;
}

export interface HouseInputEdit {
    id: number;
    name: string;
    active:boolean;
    construction_id:number;
    plan_id:number;
    street:string;
    unit:string;
    city:string;
    state:string;
    zip_code:string;
}
export interface HousesStatuses{
    house_id:number;
    type_of_work_name:string;
    status_name:string;
    target_date:string;
    status_color:string;
}