export interface House {
    id: number;
    construction_id:number;
    plan_id:number;
    name: number;
    created_at:string;
    active:boolean;
    street:string;
    unit:string;
    city:string;
    state:string;
    zip_code:string;
}

export interface HouseInputAdd {
    name: number;
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
    name: number;
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
export interface HouseFiltered{
    id:number;
    house_id:number;
    house_name:number;
    street:string | null;
    unit:string | null;
    city:string | null;
    state:string | null;
    zip_code:string | null;
    type_of_work_name:string;
    status_id:number;
    status_color:string;
    status_name:string;
    target_date:string;
    user_id:number | null;
    user_name:string | null;
    company_id: number;
    construction_id: number;
    plan_id:number;
    plan_name:string;
    construction_name:string;
    note:string;
    construction_location:string;
}