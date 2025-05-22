import React from 'react';
import {Offcanvas} from "react-bootstrap";
import AddForm from "./AddForm";

type AddSidePanelProps = {
    show: boolean;
    handleClose: () => void;
}

const AddSidePanel = ({show, handleClose}: AddSidePanelProps) => {
    return (
        <Offcanvas show={show} placement={"end"} onHide={handleClose} scroll={true} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create Type Of Work</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <AddForm handleClose={handleClose} />
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default AddSidePanel;