import React from 'react';
import {Offcanvas} from "react-bootstrap";
import AddForm from "../construction/AddForm";

type AddSidePanelProps ={
    show:boolean,
    handleClose: ()=>void,
}

const AddHouseSidePanel = ({show, handleClose}:AddSidePanelProps) => {
    return (
        <Offcanvas show={show} placement={"end"} onHide={handleClose} scroll={true} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create House</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <AddForm handleClose={handleClose} company_id={7} />
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default AddHouseSidePanel;