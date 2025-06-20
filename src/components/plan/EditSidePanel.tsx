import React from 'react';
import {Offcanvas} from "react-bootstrap";
import EditPlanForm from "./EditPlanForm";

type PlanEditSidePanelProps = {
    id:number,
    showEditSidePanel: boolean,
    handleCloseEditSidePanel:()=>void
}

const EditSidePanel = ({id, showEditSidePanel, handleCloseEditSidePanel }:PlanEditSidePanelProps) => {
    return (
        <Offcanvas show={showEditSidePanel} onHide={handleCloseEditSidePanel} placement={"end"} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Plan</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <EditPlanForm id={id} handleCloseEditSidePanel={handleCloseEditSidePanel} />
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default EditSidePanel;