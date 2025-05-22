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
                <BreadcrumbsComp />
                <Button className={"mb-3"} variant="primary" onClick={handleShow}>
                    Add
                </Button>
               <List />
            </Container>
            <AddSidePanel show={show} handleClose={handleClose} />
        </>

    );
};

export default TypesOfWork;