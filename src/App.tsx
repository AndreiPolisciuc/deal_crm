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

import FullPageLoader from "./components/FullPageLoader";
import DetailPlan from "./pages/company/DetailPlan";
import {useStore} from "./store/useStore";


function App() {
    const [show, setShow] = useState(false);


    const { error, loading, clearError } = useStore();
    const heandleClose =() =>{
        setShow(false);
        clearError()
    }
    //const loading = loadingTypeOfWork || loadingCompany || loadingConstruction ||loadingPlan ||loadingPlanInformation;

    return (
        <>
            <div className="d-flex">
                <LeftMenu show={show} setShow={setShow}/>
                <div className="flex-grow-1">
                    <TopMenu setShow={setShow}/>

                    {error && <Alert variant="danger" onClose={heandleClose} dismissible>
                        <Alert.Heading>{error}</Alert.Heading>
                    </Alert>}

                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/companies" element={<ListCompanies/>}/>
                        <Route path="/type-of-work" element={<TypesOfWork/>}/>
                        <Route path="/companies/:id" element={<DetailCompany/>}/>
                        <Route path="/companies/:company_id/:id" element={<DetailConstruction/>}/>
                        <Route path="/companies/:company_id/:construction_id/:id" element={<DetailPlan />} />
                    </Routes>
                </div>
            </div>
            {loading && <FullPageLoader />}
        </>

    );
}

export default App;
