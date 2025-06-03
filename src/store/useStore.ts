// useStore.ts
import { useCompanyStore } from "./useCompanyStore";
import { useTypeOfWorkStore } from "./useTypeOfWorkStore";
import { useConstructionStore } from "./useConstructionStore";
import { usePlanStore } from "./usePlanStore";
import { usePlanInformationStore } from "./usePlanInformationStore";
import { useState } from "react";
import {useHouseStore} from "./useHouseStore";
import {useUserStore} from "./useUserStore";

// Hook to combine global error and loading states from multiple stores
export const useStore = () => {
    // Get error and loading states from each specific store
    const { error: errorCompany, loading: loadingCompany } = useCompanyStore();
    const { error: errorTypeOfWork, loading: loadingTypeOfWork } = useTypeOfWorkStore();
    const { error: errorConstruction, loading: loadingConstruction } = useConstructionStore();
    const { error: errorPlan, loading: loadingPlan } = usePlanStore();
    const { error: errorPlanInformation, loading: loadingPlanInformation } = usePlanInformationStore();
    const { error: errorHouse, loading: loadingHouse } = useHouseStore();
    const { error: errorUser, loading: loadingUser } = useUserStore();

    // Local custom error that can be set manually
    const [customError, setCustomError] = useState<string | null>(null);

    // Returns the first available error (custom or from stores)
    const getError = () => {
        return (
            customError ||
            errorCompany ||
            errorTypeOfWork ||
            errorConstruction ||
            errorPlan ||
            errorPlanInformation ||
            errorHouse ||
            errorUser ||
            null
        );
    };

    // Returns true if any of the stores is loading
    const getLoading = () => {
        return (
            loadingCompany ||
            loadingTypeOfWork ||
            loadingConstruction ||
            loadingPlan ||
            loadingHouse ||
            loadingUser ||
            loadingPlanInformation
        );
    };

    // Clears the local custom error
    const clearError = () => setCustomError(null);

    return {
        error: getError(),       // Current error
        loading: getLoading(),   // Current loading state
        setError: setCustomError, // Manually set custom error
        clearError               // Clear the error manually
    };
};
