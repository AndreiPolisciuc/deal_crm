import React from 'react';
import {useConstructionStore} from "../../store/useConstructionStore";
import {Button, Modal} from "react-bootstrap";

type ConstructionDeleteModalProps = {
    id:number,
    company_id: number,
    showDeleteModal: boolean,
    handleCloseDeleteModal:()=>void
}

const DeleteModal = ({id, company_id, showDeleteModal, handleCloseDeleteModal}:ConstructionDeleteModalProps) => {
    const { deleteConstruction  } = useConstructionStore();
    const handleDelete =() =>{
        handleCloseDeleteModal();
        deleteConstruction(id, company_id);
    }

    return (
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the construction?</Modal.Body>
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