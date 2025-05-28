import { create } from 'zustand';
import axios from 'axios';
import { PlanInformation, PlanInformationInputAdd } from "../types/PlanInformation";

interface PlanInformationState {
    planInformations: PlanInformation[];
    planInformation: PlanInformation;
    loading: boolean;
    error: string | null;
    uploadedFilename?: string;
    mimetype: string;
    uploadFile: (formData: FormData) => Promise<{ filename: string; mimetype: string } | null>;
    fetchPlanInformations: () => Promise<void>;
    fetchPlanInformationsInPlan: (plan_id:number) =>Promise<void>;
    addPlanInformation: (plan: PlanInformationInputAdd) => Promise<void>;
    deletePlanInformation: (id:number, plan_id:number) => Promise<void>;
}

const apiLinkToServer = 'http://localhost:4000/api/plan-information';
const apiUploadLinkToServer = 'http://localhost:4000/api/upload';

export const usePlanInformationStore = create<PlanInformationState>((set, get) => ({
    planInformations: [],
    planInformation: {
        id: 0,
        plan_id: 0,
        name: '',
        text:'',
        created_at: '',
        active: true,
        file:null,
        type_of_file:'',
        type_of_work_id:0
    },
    mimetype:'',
    loading: false,
    error: null,
    uploadedFilename: undefined,
    uploadFile: async (formData) => {
        // Set loading to true and clear previous errors
        set({ loading: true, error: null });

        try {
            // Send file to the server using multipart/form-data
            const res = await axios.post(apiUploadLinkToServer, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Optionally store the filename in the store (can be omitted)
            set({ uploadedFilename: res.data.filename });

            // Return the uploaded file data
            return {
                filename: res.data.filename,
                mimetype: res.data.mimetype,
            };
        } catch (err: any) {
            // Save error to the store
            set({ error: err.message });

            // Return null to indicate failure
            return null;
        } finally {
            // Always disable loading state
            set({ loading: false });
        }
    },
    fetchPlanInformations: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<PlanInformation[]>(apiLinkToServer + "s");
            set({ planInformations: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
    fetchPlanInformationsInPlan: async (plan_id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<PlanInformation[]>(apiLinkToServer + "s/"+plan_id);
            set({ planInformations: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    addPlanInformation: async (planInformation) => {
        // Start loading and reset any existing error
        set({ loading: true, error: null });

        if (planInformation.file) {
            // Prepare FormData to upload the file
            const formData = new FormData();
            formData.append('file', planInformation.file);

            // Upload file and receive filename and mimetype
            const uploadResult = await get().uploadFile(formData);

            // If upload failed, stop the function (error is already set)
            if (!uploadResult) return;

            // Replace file with filename returned by the server
            planInformation.file = uploadResult.filename;

            // Save the mimetype (optional, depends on backend model)
            planInformation.type_of_file = uploadResult.mimetype;
        }

        try {
            // Send the complete plan information to the server
            await axios.post(apiLinkToServer, planInformation);

            // Refresh the list after adding
            await get().fetchPlanInformationsInPlan(planInformation.plan_id);
        } catch (err: any) {
            // Set error if something goes wrong
            set({ error: err.message });
        } finally {
            // End loading state
            set({ loading: false });
        }
    },

    deletePlanInformation: async (id: number, plan_id:number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiLinkToServer}/${id}`);
            await get().fetchPlanInformationsInPlan(plan_id); // обновим список
        } catch (err: any) {
            set({ error: err.message });
        }
        set({ loading: false });
    },

}));