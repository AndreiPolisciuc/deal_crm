import React, {useEffect, useState} from 'react';
import {usePlanStore} from "../../store/usePlanStore";
import {Alert, Button, Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import EditSidePanel from "../../components/plan/EditSidePanel";
import BreadcrumbsComp from "../../components/BreadcrumbsComp";
import TypesOfWorkTabs from "../../components/plan/TypesOfWorkTabs";

const DetailPlan = () => {
    const {plan,fetchPlan} = usePlanStore()
    const navigate = useNavigate();

    const { company_id, id } = useParams<{company_id:string, id: string }>();
    const numberId= Number(id);
    const numberCompanyId= Number(company_id);


    const [showEditSidePanel, setShowEditSidePanel] = useState(false);
    const handleCloseEditSidePanel = () => {
        setShowEditSidePanel(false);
    }
    const handleShowEditSidePanel = (numberId:number) => {
        setShowEditSidePanel(true);
    }

    useEffect(() => {
        fetchPlan(numberId)
    }, [showEditSidePanel]);


    return (
        <>
            <Container>
                <h1>{plan.name}</h1>
                <hr></hr>
                <Button className={"me-2"} variant="outline-secondary"
                        onClick={() => navigate(`/companies/${numberCompanyId}/${plan.construction_id}`)}>
                    <i className="bi bi-arrow-left-circle"></i>
                </Button>
                <Button className={"ms-3"} variant={"outline-secondary"}
                        onClick={() => handleShowEditSidePanel(plan.id)}>
                    <i className="bi bi-pencil me-2"></i>
                    Edit
                </Button>
                <hr></hr>
                <BreadcrumbsComp openPageName ={plan.name}/>
                {!plan.active &&
                    <Alert key={'secondary'} variant={'secondary'}>
                        Not active!
                    </Alert>}
                <hr></hr>
                <TypesOfWorkTabs plan_id={plan.id} />

            </Container>
            <EditSidePanel
                id={plan.id}
                showEditSidePanel={showEditSidePanel}
                handleCloseEditSidePanel={handleCloseEditSidePanel}
            />
        </>

    );
};

export default DetailPlan;