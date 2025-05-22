import React from 'react';
import {Offcanvas} from "react-bootstrap";
import AddForm from "../construction/AddForm";

type AddSidePanelProps ={
    show:boolean,
    handleClose: ()=>void,
    company_id:number
}

const AddSidePanel = ({show, handleClose, company_id}:AddSidePanelProps) => {
    return (
        <Offcanvas show={show} placement={"end"} onHide={handleClose} scroll={true} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create Company</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <AddForm handleClose={handleClose} company_id={company_id} />
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default AddSidePanel;