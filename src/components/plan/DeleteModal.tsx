import React from 'react';
import {usePlanStore} from "../../store/usePlanStore";
import {Button, Modal} from "react-bootstrap";

type PlanDeleteModalProps = {
    id:number,
    construction_id: number,
    showDeleteModal: boolean,
    handleCloseDeleteModal:()=>void
}

const DeleteModal = ({id, construction_id, showDeleteModal, handleCloseDeleteModal}:PlanDeleteModalProps) => {
    const { deletePlan  } = usePlanStore();
    const handleDelete =() =>{
        handleCloseDeleteModal();
        deletePlan(id, construction_id);
    }

    return (
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the plan?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;