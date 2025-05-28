import React from 'react';
import {Offcanvas} from "react-bootstrap";
import AddInformationForm from "./AddInformationForm";

type AddInformationSidePanelProps ={
    show:boolean,
    handleClose: ()=>void,
    typeOfWorkId: number
}

const AddInformationSidePanel = ({show, handleClose, typeOfWorkId}:AddInformationSidePanelProps) => {
    return (
        <Offcanvas show={show} placement={"end"} onHide={handleClose} scroll={true} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add Information</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <AddInformationForm handleClose={handleClose} typeOfWorkId={typeOfWorkId} />
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default AddInformationSidePanel;