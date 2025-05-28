import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import BreadcrumbsComp from "../components/BreadcrumbsComp";
import AddSidePanel from "../components/typesOfWork/AddSidePanel";
import List from ".././components/typesOfWork/List"

const TypesOfWork = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Container>
                <h1>Types of work</h1>
                <BreadcrumbsComp openPageName={"Types of work"}/>
                <div className={'d-flex justify-content-end mb-3'}>
                    <Button variant="primary" onClick={handleShow}>
                        <i className="me-2 bi bi-plus-circle"></i>
                        Add Type
                    </Button>
                </div>
                <List/>
            </Container>
            <AddSidePanel show={show} handleClose={handleClose}/>
        </>

    );
};

export default TypesOfWork;