import React from 'react';
import {useHouseStore} from "../../store/useHouseStore";
import {Button, Modal} from "react-bootstrap";

type HouseDeleteModalProps = {
    id:number,
    construction_id: number,
    showDeleteModal: boolean,
    handleCloseDeleteModal:()=>void
}

const DeleteModalHouse = ({id, construction_id, showDeleteModal, handleCloseDeleteModal}:HouseDeleteModalProps) => {
    const { deleteHouse  } = useHouseStore();
    const handleDelete =() =>{
        handleCloseDeleteModal();
        deleteHouse(id, construction_id);
    }

    return (
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the house?</Modal.Body>
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

export default DeleteModalHouse;