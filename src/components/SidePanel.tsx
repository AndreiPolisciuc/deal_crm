import React from 'react';
import {Offcanvas} from "react-bootstrap";
import AddHouseForm from "./house/AddHouseForm";
import AddPlanForm from "./plan/AddPlanForm";


type AddSidePanelProps ={
    nameAction: string,
    show:boolean,
    handleClose: ()=>void,
}

const SidePanel = ({nameAction, show, handleClose}:AddSidePanelProps) => {
    let form = <h2>Error</h2>
    switch (nameAction) {
        case "Create House":
            form =<AddHouseForm handleClose={handleClose} />;
            break;
        case "Create Plan":
            form =<AddPlanForm handleClose={handleClose} />
            break;
    }


    return (
        <Offcanvas show={show} placement={"end"} onHide={handleClose} scroll={true} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{nameAction}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {form}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default SidePanel;