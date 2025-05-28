import React, {useEffect, useState} from 'react';
import {Button, Tab, Tabs} from "react-bootstrap";
import {useTypeOfWorkStore} from "../../store/useTypeOfWorkStore";
import AddInformationSidePanel from "./AddInformationSidePanel";
import {usePlanInformationStore} from "../../store/usePlanInformationStore";
import TypesOfWorkTabsContent from "./TypeOfWorkTabsContent";

type Props={
    plan_id: number
}

const TypesOfWorkTabs = ({plan_id}:Props) => {
    // Destructure state and action from company store
    const { typesOfWork, fetchActiveTypesOfWork } = useTypeOfWorkStore();
    const{planInformations, fetchPlanInformationsInPlan} = usePlanInformationStore();

    const [typeOfWorkId, setTypeOfWorkId] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id:number) => {
        setShow(true);
        setTypeOfWorkId(id);
    }


    // Fetch company data on component mount
    useEffect(() => {
        fetchActiveTypesOfWork();
        fetchPlanInformationsInPlan(plan_id);
    }, [plan_id]);

    return (
        <>
            <h4>Types Of Work</h4>
            <Tabs
                defaultActiveKey="0"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                {typesOfWork.map((typeOfWork, index) => (
                    <Tab eventKey={index} title={typeOfWork.name} key={typeOfWork.id}>
                        <div className={'d-flex justify-content-end'}>
                            <Button className={"mb-3"} variant="primary" onClick={()=>handleShow(typeOfWork.id)}>
                                <i className="me-2 bi bi-plus-circle"></i>
                                Add
                            </Button>
                        </div>
                        <TypesOfWorkTabsContent planInformations={planInformations} type_of_work_id={typeOfWork.id}/>

                    </Tab>
                ))}
            </Tabs>
            <AddInformationSidePanel show={show} handleClose={handleClose} typeOfWorkId={typeOfWorkId} />
        </>
    );
};

export default TypesOfWorkTabs;