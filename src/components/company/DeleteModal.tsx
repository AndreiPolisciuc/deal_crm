import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useCompanyStore} from "../../store/useCompanyStore";

type DeleteModalProps = {
    id:number,
    showDeleteModal: boolean,
    handleCloseDeleteModal:()=>void
}

const DeleteModal = ({id, showDeleteModal, handleCloseDeleteModal}:DeleteModalProps) => {

    const { deleteCompany  } = useCompanyStore();
    const handleDelete =() =>{
        handleCloseDeleteModal();
        deleteCompany(id);
    }
    return (

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the company?</Modal.Body>
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