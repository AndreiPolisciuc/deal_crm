import { create } from 'zustand';
import axios from 'axios';
import {House, HouseInputAdd, HouseInputEdit, HousesStatuses, HouseFiltered} from '../types/House';
import {SERVER_LINK} from "../globals";

interface HouseState {
    houses: House[];
    house:House;
    housesFiltered:HouseFiltered[];
    houseFiltered:HouseFiltered;
    loading: boolean;
    error: string | null;
    fetchHouses: () => Promise<void>;
    fetchHousesInConstruction: (construction_id:number) => Promise<void>;
    fetchHouse: (id:number) => Promise<void>;
    fetchFilterHouses: (type_of_work_id:string | undefined, status_id:string | undefined, user_id:string | undefined, construction_id:string | undefined, house_name:string, target_date:string) => Promise<void>;
    addHouse: (house: HouseInputAdd) => Promise<void>;
    deleteHouse: (id: number, construction_id:number) => Promise<void>;
    updateHouse: (house: HouseInputEdit) => Promise<void>;
    fetchHousesStatuses:(hoseId:number) => Promise<void>;
    housesStatuses:HousesStatuses[];
    changeStatus: (id:number, status_id:string) => Promise<void>;
    changeDate: (id:number, target_date:string) => Promise<void>;
    changeUser: (id:number, user_id:string) => Promise<void>;
    changeNote: (id:number, note:string) => Promise<void>;
}

const apiLinkToServer = SERVER_LINK+'/api/house';

export const useHouseStore = create<HouseState>((set, get) => ({
    houses: [],
    housesFiltered: [],
    loading: false,
    error: null,
    house:{
        id:0,
        construction_id:0,
        plan_id:0,
        name:0,
        created_at:'',
        active:true,
        street:'',
        unit:'',
        city:'',
        state:'CA',
        zip_code:''
    },
    houseFiltered:{
        id:0,
        house_id:0,
        house_name:0,
        street:'',
        unit:'',
        city:'',
        zip_code:'',
        state:'',
        type_of_work_name:'',
        status_id:0,
        status_color:'',
        status_name:'',
        target_date:'',
        user_id:0,
        user_name:'',
        company_id:0,
        construction_id:0,
        plan_id:0,
        plan_name:'',
        construction_name:'',
        note:''
    },
    housesStatuses:[],

    fetchHouse: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<House>(apiLinkToServer+"/"+id);
            set({ house: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },



    fetchHouses: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<House[]>(apiLinkToServer+"s");
            set({ houses: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    fetchFilterHouses: async (type_of_work_id, status_id, user_id, construction_id, house_name, target_date) => {
        set({ loading: true, error: null });

        try {
            const res = await axios.get<HouseFiltered[]>(apiLinkToServer + "s-filter", {
                params: {
                    type_of_work_id,
                    status_id,
                    user_id,
                    construction_id,
                    house_name,
                    target_date
                }
            });
            set({ housesFiltered: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    fetchHousesInConstruction: async (construction_id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<House[]>(apiLinkToServer+"s/"+construction_id);
            set({ houses: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    fetchHousesStatuses: async (construction_id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<HousesStatuses[]>(apiLinkToServer+"-statuses/"+construction_id);
            set({ housesStatuses: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },



    addHouse: async (house: HouseInputAdd) => {
        set({ loading: true, error: null });
        try {
            await axios.post(apiLinkToServer, house);
            await get().fetchHousesInConstruction(house.construction_id);
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },


    changeStatus: async (id, status_id) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"-status-change/", {id, status_id});
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

    changeDate: async (id, target_date) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"-date-change/", {id, target_date});
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
    changeUser: async (id, user_id) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"-user-change/", {id, user_id});
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

    changeNote: async (id, note) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"-note-change/", {id, note});
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },


    updateHouse: async (house: HouseInputEdit) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"/"+house.id, house);
            await get().fetchHousesInConstruction(house.construction_id);
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

    deleteHouse: async (id: number, construction_id:number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiLinkToServer}/${id}`);
            await get().fetchHousesInConstruction(construction_id); // обновим список
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
}));
