import { create } from 'zustand';
import axios from 'axios';
import {Status, StatusInput, StatusInputEdit} from "../types/Status";
import {SERVER_LINK} from "../globals";

interface StatusState {
    statuses: Status[];
    status:Status;
    loading: boolean;
    error: string | null;
    fetchStatuses: () => Promise<void>;
    fetchActiveStatuses: () => Promise<void>;
    fetchStatus: (id:number) => Promise<void>;
    addStatus: (Status: StatusInput) => Promise<void>;
    deleteStatus: (id: number) => Promise<void>;
    updateStatus: (Status: StatusInputEdit) => Promise<void>;

}

const apiLinkToServer = SERVER_LINK+'/api/status';

export const useStatusStore = create<StatusState>((set, get) => ({
    statuses: [],
    loading: false,
    error: null,
    status:{
        id:0,
        name:'',
        created_at:'',
        active:true,
        sort:500
    },

    fetchStatus: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Status>(apiLinkToServer+"/"+id);
            set({ status: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },



    fetchStatuses: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Status[]>(apiLinkToServer);
            set({ statuses: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
    fetchActiveStatuses: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Status[]>(apiLinkToServer+"/active");
            set({ statuses: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    addStatus: async (Status: StatusInput) => {
        set({ loading: true, error: null });
        try {
            await axios.post(apiLinkToServer, Status);
            await get().fetchStatuses();
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
    updateStatus: async (Status: StatusInputEdit) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"/"+Status.id, Status);
            await get().fetchStatuses();
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

    deleteStatus: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiLinkToServer}/${id}`);
            await get().fetchStatuses(); // обновим список
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
}));
