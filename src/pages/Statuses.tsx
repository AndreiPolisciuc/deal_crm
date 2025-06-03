import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import BreadcrumbsComp from "../components/BreadcrumbsComp";
import List from "../components/status/List";
import AddSidePanel from "../components/status/AddSidePanel";

const Statuses = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Container>
                <h1>Statuses</h1>
                <BreadcrumbsComp openPageName={"Statuses"}/>
                <div className={'d-flex justify-content-end mb-3'}>
                    <Button variant="primary" onClick={handleShow}>
                        <i className="me-2 bi bi-plus-circle"></i>
                        Add Status
                    </Button>
                </div>
                <List/>
            </Container>
            <AddSidePanel show={show} handleClose={handleClose}/>
        </>
    );
};

export default Statuses;