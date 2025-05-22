import { create } from 'zustand';
import axios from 'axios';
import {TypeOfWork, TypeOfWorkInput, TypeOfWorkInputEdit} from "../types/TypeOfWork";

interface TypeOfWorkState {
    typesOfWork: TypeOfWork[];
    typeOfWork:TypeOfWork;
    loading: boolean;
    error: string | null;
    fetchTypesOfWork: () => Promise<void>;
    fetchTypeOfWork: (id:number) => Promise<void>;
    addTypeOfWork: (typeOfWork: TypeOfWorkInput) => Promise<void>;
    deleteTypeOfWork: (id: number) => Promise<void>;
    updateTypeOfWork: (typeOfWork: TypeOfWorkInputEdit) => Promise<void>;

}

const apiLinkToServer = 'http://localhost:4000/api/type_of_work';

export const useTypeOfWorkStore = create<TypeOfWorkState>((set, get) => ({
    typesOfWork: [],
    loading: false,
    error: null,
    typeOfWork:{
        id:0,
        name:'',
        text:'',
        created_at:'',
        active:true,
        sort:500
    },

    fetchTypeOfWork: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<TypeOfWork>(apiLinkToServer+"/"+id);
            set({ typeOfWork: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },



    fetchTypesOfWork: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<TypeOfWork[]>(apiLinkToServer);
            set({ typesOfWork: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    addTypeOfWork: async (typeOfWork: TypeOfWorkInput) => {
        set({ loading: true, error: null });
        try {
            await axios.post(apiLinkToServer, typeOfWork);
            await get().fetchTypesOfWork();
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
    updateTypeOfWork: async (typeOfWork: TypeOfWorkInputEdit) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"/"+typeOfWork.id, typeOfWork);
            await get().fetchTypesOfWork();
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

    deleteTypeOfWork: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiLinkToServer}/${id}`);
            await get().fetchTypesOfWork(); // обновим список
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
}));
