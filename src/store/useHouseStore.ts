import { create } from 'zustand';
import axios from 'axios';
import {House, HouseInputAdd, HouseInputEdit, HousesStatuses} from '../types/House';
import {SERVER_LINK} from "../globals";

interface HouseState {
    houses: House[];
    house:House;
    loading: boolean;
    error: string | null;
    fetchHouses: () => Promise<void>;
    fetchHousesInConstruction: (construction_id:number) => Promise<void>;
    fetchHouse: (id:number) => Promise<void>;
    addHouse: (house: HouseInputAdd) => Promise<void>;
    deleteHouse: (id: number, construction_id:number) => Promise<void>;
    updateHouse: (house: HouseInputEdit) => Promise<void>;
    fetchHousesStatuses:(hoseId:number) => Promise<void>;
    housesStatuses:HousesStatuses[];
}

const apiLinkToServer = SERVER_LINK+'/api/house';

export const useHouseStore = create<HouseState>((set, get) => ({
    houses: [],
    loading: false,
    error: null,
    house:{
        id:0,
        construction_id:0,
        plan_id:0,
        name:'',
        created_at:'',
        active:true,
        street:'',
        unit:'',
        city:'',
        state:'CA',
        zip_code:''
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
