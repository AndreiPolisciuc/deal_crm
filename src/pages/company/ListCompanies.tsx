import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import AddSidePanel from "../../components/company/AddSidePanel";
import List from "../../components/company/List";
import BreadcrumbsComp from "../../components/BreadcrumbsComp";

const ListCompanies = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Container>
                <h1>Companies Page</h1>
                <BreadcrumbsComp openPageName ={"Companies Page"}/>
                <div className={'d-flex justify-content-end'}>
                    <Button className={"mb-3"} variant="primary" onClick={handleShow}>
                        <i className="me-2 bi bi-plus-circle"></i>
                        Add Company
                    </Button>
                </div>

                <List/>
            </Container>
            <AddSidePanel show={show} handleClose={handleClose}  />
        </>

    );
};

export default ListCompanies;