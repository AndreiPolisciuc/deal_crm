import React from 'react';
import {Offcanvas} from "react-bootstrap";
import AddForm from "../plan/AddForm";

type AddSidePanelProps ={
    show:boolean,
    handleClose: ()=>void,
    construction_id:number
}

const AddSidePanel = ({show, handleClose, construction_id}:AddSidePanelProps) => {
    return (
        <Offcanvas show={show} placement={"end"} onHide={handleClose} scroll={true} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create Company</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <AddForm handleClose={handleClose} construction_id={construction_id} />
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default AddSidePanel;