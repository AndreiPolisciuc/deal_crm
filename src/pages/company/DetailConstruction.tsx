import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useConstructionStore} from "../../store/useConstructionStore";
import {Alert, Button, Container, Tab, Tabs} from "react-bootstrap";
import BreadcrumbsComp from "../../components/BreadcrumbsComp";
import EditSidePanel from "../../components/construction/EditSidePanel";
import AddSidePanel from "../../components/plan/AddSidePanel";
import List from "../../components/plan/List";

const DetailConstruction = () => {
    const { company_id, id } = useParams<{company_id:string, id: string }>();
    const numberId= Number(id);
    const numberCompanyId= Number(company_id);
    const {construction, fetchConstruction} =useConstructionStore();
    const navigate = useNavigate();

    const [showEditSidePanel, setShowEditSidePanel] = useState(false);
    const handleCloseEditSidePanel = () => {
        setShowEditSidePanel(false);
    }
    const handleShowEditSidePanel = (numberId:number) => {
        setShowEditSidePanel(true);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        fetchConstruction(numberId);
    }, [showEditSidePanel]);
    return (
        <>
            <Container>
                <h1>{construction.name} </h1>
                <hr></hr>
                <Button className={"me-2"} variant="outline-secondary"
                        onClick={() => navigate(`/companies/${numberCompanyId}`)}>
                    <i className="bi bi-arrow-left-circle"></i>
                </Button>
                {construction.location &&
                    <Button className={"mx-1"} variant="outline-secondary" href={construction.location} target="_blank">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        Location
                    </Button>}
                <Button className={"ms-3"} variant={"outline-secondary"}
                        onClick={() => handleShowEditSidePanel(construction.id)}>
                    <i className="bi bi-pencil me-2"></i>
                    Edit
                </Button>
                <hr></hr>
                <BreadcrumbsComp openPageName ={construction.name}/>
                {!construction.active &&
                    <Alert key={'secondary'} variant={'secondary'}>
                        Not active!
                    </Alert>}
                <hr></hr>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Plans</h4>
                    <Button variant="primary" onClick={handleShow}>
                        <i className="me-2 bi bi-plus-circle"></i>
                        Add Plan
                    </Button>
                </div>
                <List construction_id={construction.id}/>

            </Container>
            <AddSidePanel construction_id={construction.id} show={show} handleClose={handleClose}/>
            <EditSidePanel id={numberId} showEditSidePanel={showEditSidePanel} handleCloseEditSidePanel={handleCloseEditSidePanel} />

        </>

    );
};

export default DetailConstruction;