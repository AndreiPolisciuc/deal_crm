import { create } from 'zustand';
import axios from 'axios';
import {Company, CompanyInput, CompanyInputEdit} from '../types/Company';
import {SERVER_LINK} from "../globals";

interface CompanyState {
    companies: Company[];
    company:Company;
    loading: boolean;
    error: string | null;
    fetchCompanies: () => Promise<void>;
    fetchCompany: (id:number) => Promise<void>;
    addCompany: (company: CompanyInput) => Promise<void>;
    deleteCompany: (id: number) => Promise<void>;
    updateCompany: (company: CompanyInputEdit) => Promise<void>;

}

const apiLinkToServer = SERVER_LINK+'/api/company';

export const useCompanyStore = create<CompanyState>((set, get) => ({
    companies: [],
    loading: false,
    error: null,
    company:{
        id:0,
        name:'',
        text:'',
        created_at:'',
        active:true
    },

    fetchCompany: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Company>(apiLinkToServer+"/"+id);
            set({ company: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },



    fetchCompanies: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Company[]>(apiLinkToServer);
            set({ companies: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    addCompany: async (company: CompanyInput) => {
        set({ loading: true, error: null });
        try {
            await axios.post(apiLinkToServer, company);
            await get().fetchCompanies();
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
    updateCompany: async (company: CompanyInputEdit) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"/"+company.id, company);
            await get().fetchCompanies();
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

    deleteCompany: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiLinkToServer}/${id}`);
            await get().fetchCompanies(); // обновим список
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
}));
