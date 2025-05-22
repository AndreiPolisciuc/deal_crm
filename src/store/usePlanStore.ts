import { create } from 'zustand';
import axios from 'axios';
import {Plan, PlanInputAdd, PlanInputEdit} from '../types/Plan';

interface PlanState {
    plans: Plan[];
    plan:Plan;
    loading: boolean;
    error: string | null;
    fetchPlans: () => Promise<void>;
    fetchPlansInConstruction: (construction_id:number) => Promise<void>;
    fetchPlan: (id:number) => Promise<void>;
    addPlan: (plan: PlanInputAdd) => Promise<void>;
    deletePlan: (id: number, construction_id:number) => Promise<void>;
    updatePlan: (plan: PlanInputEdit) => Promise<void>;

}

const apiLinkToServer = 'http://localhost:4000/api/plan';

export const usePlanStore = create<PlanState>((set, get) => ({
    plans: [],
    loading: false,
    error: null,
    plan:{
        id:0,
        construction_id:0,
        name:'',
        created_at:'',
        active:true
    },

    fetchPlan: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Plan>(apiLinkToServer+"/"+id);
            set({ plan: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },



    fetchPlans: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Plan[]>(apiLinkToServer+"s");
            set({ plans: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    fetchPlansInConstruction: async (construction_id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<Plan[]>(apiLinkToServer+"s/"+construction_id);
            set({ plans: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    addPlan: async (plan: PlanInputAdd) => {
        set({ loading: true, error: null });
        try {
            await axios.post(apiLinkToServer, plan);
            await get().fetchPlansInConstruction(plan.construction_id);
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
    updatePlan: async (plan: PlanInputEdit) => {
        set({ loading: true, error: null });
        try {
            await axios.put(apiLinkToServer+"/"+plan.id, plan);
            await get().fetchPlansInConstruction(plan.construction_id);
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

    deletePlan: async (id: number, construction_id:number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiLinkToServer}/${id}`);
            await get().fetchPlansInConstruction(construction_id); // обновим список
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },
}));
