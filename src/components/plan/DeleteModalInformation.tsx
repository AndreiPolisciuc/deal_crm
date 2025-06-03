import React from 'react';
import {useConstructionStore} from "../../store/useConstructionStore";
import {Button, Modal} from "react-bootstrap";
import {usePlanInformationStore} from "../../store/usePlanInformationStore";
import {usePlanStore} from "../../store/usePlanStore";

type ConstructionDeleteModalProps = {
    id:number,
    showDeleteModal: boolean,
    handleCloseDeleteModal:()=>void
}

const DeleteModal = ({id, showDeleteModal, handleCloseDeleteModal}:ConstructionDeleteModalProps) => {
    const {plan} = usePlanStore()
    const { deletePlanInformation  } = usePlanInformationStore();
    const handleDelete =() =>{
        handleCloseDeleteModal();
        deletePlanInformation(id, plan.id);
    }

    return (
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this information?</Modal.Body>
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