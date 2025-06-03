import { create } from 'zustand';
import axios from 'axios';
import {Construction, ConstructionInputAdd, ConstructionInputEdit} from '../types/Construction';
import {SERVER_LINK} from "../globals";

interface ConstructionState {
    constructions: Construction[];
    construction:Construction;
    loading: boolean;
    error: string | null;
    fetchConstructions: () => Promise<void>;
    fetchConstructionsInCompany: (company_id:number) => Promise<void>;
    fetchConstruction: (id:number) => Promise<void>;
    addConstruction: (construction: ConstructionInputAdd) => Promise<void>;
    deleteConstruction: (id: number, company_id:number) => Promise<void>;
    updateConstruction: (construction: ConstructionInputEdit) => Promise<void>;

}

const apiLinkToServer = SERVER_LINK+'/api/construction';

export const useConstructionStore = create<ConstructionState>((set, get) => ({
    constructions: [],
    loading: false,
    error: null,
    construction:{
        id:0,
        company_id:0,
        name:'',
        text:'',
        created_at:'',
        location:'',
        active:true
    },

    fetchConstruction: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Construction>(apiLinkToServer+"/"+id);
            set({ construction: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },



    fetchConstructions: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Construction[]>(apiLinkToServer+"s");
            set({ constructions: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    fetchConstructionsInCompany: async (company_id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Construction[]>(apiLinkToServer+"s/"+company_id);
            set({ constructions: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    addConstruction: async (construction: ConstructionInputAdd) => {
        set({ loading: true, error: null });
        try {
            await axios.post(apiLinkToServer, construction);
            await get().fetchConstructionsInCompany(construction.company_id);
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
    updateConstruction: async (construction: ConstructionInputEdit) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"/"+construction.id, construction);
            await get().fetchConstructionsInCompany(construction.company_id);
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

    deleteConstruction: async (id: number, company_id:number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiLinkToServer}/${id}`);
            await get().fetchConstructionsInCompany(company_id); // обновим список
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
}));
