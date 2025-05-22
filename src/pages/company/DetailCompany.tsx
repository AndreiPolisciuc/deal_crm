import React, {useEffect, useState} from 'react';
import {useCompanyStore} from "../../store/useCompanyStore";
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Container} from "react-bootstrap";
import BreadcrumbsComp from "../../components/BreadcrumbsComp";
import List from "../../components/construction/List";
import EditSidePanel from "../../components/company/EditSidePanel";
import AddSidePanel from "../../components/construction/AddSidePanel";


const DetailCompany = () => {
    const { id } = useParams<{ id: string }>();
    const numberId = Number(id);
    const { company, fetchCompany  } = useCompanyStore();
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
        fetchCompany(numberId);
    }, [showEditSidePanel]);
    return (
        <>
            <Container>
                <h1>{company.name}</h1>
                <hr></hr>
                <Button className={"me-2"} variant="outline-secondary" onClick={() => navigate('/companies/')}>
                    <i className="bi bi-arrow-left-circle"></i>
                </Button>
                <Button className={"ms-3"} variant={"outline-secondary"}
                        onClick={() => handleShowEditSidePanel(company.id)}>
                    <i className="bi bi-pencil me-2"></i>
                    Edit
                </Button>
                <hr></hr>
                <BreadcrumbsComp/>
                {!company.active &&
                    <Alert key={'danger'} variant={'danger'}>
                        Not active!
                    </Alert>}
                {company.text ? <p>{company.text}</p> : null}

                <hr></hr>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Constructions</h4>
                    <Button variant="primary" onClick={handleShow}>
                        <i className="me-2 bi bi-plus-circle"></i>
                        Add Construction
                    </Button>
                </div>
                <List company_id={numberId}/>
            </Container>
            <AddSidePanel show={show} handleClose={handleClose} company_id={numberId}/>
            <EditSidePanel id={numberId} showEditSidePanel={showEditSidePanel} handleCloseEditSidePanel={handleCloseEditSidePanel} />
        </>
    );
};

export default DetailCompany;