import React from 'react';
import {Offcanvas} from "react-bootstrap";
import EditHouseForm from "./EditHouseForm";

type HouseEditSidePanelProps = {
    id:number,
    showEditSidePanel: boolean,
    handleCloseEditSidePanel:()=>void
}

const EditSidePanel = ({id, showEditSidePanel, handleCloseEditSidePanel }:HouseEditSidePanelProps) => {
    return (
        <Offcanvas show={showEditSidePanel} onHide={handleCloseEditSidePanel} placement={"end"} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit House</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <EditHouseForm id={id} handleCloseEditSidePanel={handleCloseEditSidePanel} />
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default EditSidePanel;