import { create } from 'zustand';
import axios from 'axios';
import {User, UserInput, UserInputEdit} from "../types/User";
import {SERVER_LINK} from "../globals";

interface UserState {
    users: User[];
    user:User;
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    fetchActiveUsers: () => Promise<void>;
    fetchUser: (id:number) => Promise<void>;
    addUser: (User: UserInput) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    updateUser: (User: UserInputEdit) => Promise<void>;

}

const apiLinkToServer = SERVER_LINK+'/api/user';

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    loading: false,
    error: null,
    user:{
        id:0,
        name:'',
        active:true
    },

    fetchUser: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<User>(apiLinkToServer+"/"+id);
            set({ user: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },



    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<User[]>(apiLinkToServer);
            set({ users: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
    addUser: async (User: UserInput) => {
        set({ loading: true, error: null });
        try {
            await axios.post(apiLinkToServer, User);
            await get().fetchUsers();
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
    updateUser: async (User: UserInputEdit) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"/"+User.id, User);
            await get().fetchUsers();
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

    fetchActiveUsers: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<User[]>(apiLinkToServer+"/active");
            set({ users: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },


    deleteUser: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiLinkToServer}/${id}`);
            await get().fetchUsers(); // обновим список
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
}));
