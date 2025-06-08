import React, {Suspense, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import LeftMenu from "./components/left_menu/LeftMenu";
import TopMenu from "./components/top_menu/TopMenu";
import {Route, Routes} from "react-router-dom";
import {Alert} from "react-bootstrap";

import FullPageLoader from "./components/FullPageLoader";
import {useStore} from "./store/useStore";


const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Statuses = React.lazy(() => import('./pages/Statuses'));
const Houses = React.lazy(() => import('./pages/Houses'));
const DetailPlan = React.lazy(() => import('./pages/company/DetailPlan'));
const TypesOfWork = React.lazy(() => import('./pages/TypesOfWork'));
const DetailCompany = React.lazy(() => import('./pages/company/DetailCompany'));
const DetailConstruction = React.lazy(() => import('./pages/company/DetailConstruction'));
const ListCompanies = React.lazy(() => import('./pages/company/ListCompanies'));


function App() {
    const [show, setShow] = useState(false);


    const { error, loading, clearError } = useStore();
    const heandleClose =() =>{
        setShow(false);
        clearError()
    }

    return (
        <>
            <div className="d-flex">
                <LeftMenu show={show} setShow={setShow}/>
                <div className="flex-grow-1">
                    <TopMenu setShow={setShow}/>

                    {error && <Alert variant="danger" onClose={heandleClose} dismissible>
                        <Alert.Heading>{error}</Alert.Heading>
                    </Alert>}

                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path={`/`} element={<Dashboard/>}/>
                            <Route path={`/houses`} element={<Houses />}/>
                            <Route path={`/companies`} element={<ListCompanies/>}/>
                            <Route path={`/type-of-work`} element={<TypesOfWork/>}/>
                            <Route path={`/statuses`} element={<Statuses/>}/>
                            <Route path={`/companies/:id`} element={<DetailCompany/>}/>
                            <Route path={`/companies/:company_id/:id`} element={<DetailConstruction/>}/>
                            <Route path={`/companies/:company_id/:construction_id/:id`} element={<DetailPlan />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
            {loading && <FullPageLoader />}
        </>

    );
}

export default App;
