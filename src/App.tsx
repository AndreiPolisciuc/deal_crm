import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LeftMenu from "./components/left_menu/LeftMenu";
import TopMenu from "./components/top_menu/TopMenu";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ListCompanies from "./pages/company/ListCompanies";
import DetailCompany from "./pages/company/DetailCompany";
import DetailConstruction from "./pages/company/DetailConstruction";
import TypesOfWork from "./pages/TypesOfWork";
import {Alert} from "react-bootstrap";

import {useConstructionStore} from "./store/useConstructionStore";
import {useTypeOfWorkStore} from "./store/useTypeOfWorkStore";
import {useCompanyStore} from "./store/useCompanyStore";
import {usePlanStore} from "./store/usePlanStore";
import FullPageLoader from "./components/FullPageLoader";


function App() {
    const [show, setShow] = useState(false);

    const {error: errorCompany, loading: loadingCompany} = useCompanyStore();
    const {error: errorTypeOfWork, loading: loadingTypeOfWork} = useTypeOfWorkStore();
    const {error: errorConstruction, loading: loadingConstruction} = useConstructionStore();
    const {error: errorPlan, loading: loadingPlan} = usePlanStore();

    const error = errorTypeOfWork || errorCompany || errorConstruction || errorPlan;
    const loading = loadingTypeOfWork || loadingCompany || loadingConstruction ||loadingPlan;

    return (
        <>
            <div className="d-flex">
                <LeftMenu show={show} setShow={setShow}/>
                <div className="flex-grow-1">
                    <TopMenu setShow={setShow}/>

                    {error && <Alert variant="danger">
                        <Alert.Heading>Oh snap! You got an error! Try again later!</Alert.Heading>
                    </Alert>}

                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/companies" element={<ListCompanies/>}/>
                        <Route path="/type-of-work" element={<TypesOfWork/>}/>
                        <Route path="/companies/:id" element={<DetailCompany/>}/>
                        <Route path="/companies/:company_id/:id" element={<DetailConstruction/>}/>
                    </Routes>
                </div>
            </div>
            {loading && <FullPageLoader />}
        </>

    );
}

export default App;
