import React from 'react';
import {Offcanvas} from "react-bootstrap";
import EditForm from "./EditForm";

type EditSidePanelProps = {
    id:number,
    showEditSidePanel: boolean,
    handleCloseEditSidePanel:()=>void
}


const EditSidePanel = ({id, showEditSidePanel, handleCloseEditSidePanel }:EditSidePanelProps) => {
    return (
        <Offcanvas show={showEditSidePanel} onHide={handleCloseEditSidePanel} placement={"end"} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Status</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <EditForm id={id} handleCloseEditSidePanel={handleCloseEditSidePanel} />
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default EditSidePanel;