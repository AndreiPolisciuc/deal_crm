import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { useTypeOfWorkStore } from '../../store/useTypeOfWorkStore';
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import EditSidePanel from "./EditSidePanel";

const List = () => {
    // Destructure state and action from company store
    const { typesOfWork, fetchTypesOfWork } = useTypeOfWorkStore();

    // ID used for editing or deleting a company
    const [id, setId] = useState(0);

    // Delete modal state and handlers
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setId(0);
    }
    const handleShowDeleteModal = (id: number) => {
        setId(id);
        setShowDeleteModal(true);
    }

    // Edit side panel state and handlers
    const [showEditSidePanel, setShowEditSidePanel] = useState(false);
    const handleCloseEditSidePanel = () => {
        setShowEditSidePanel(false);
        setId(0);
    }
    const handleShowEditSidePanel = (id: number) => {
        setId(id);
        setShowEditSidePanel(true);
    }

    // Fetch company data on component mount
    useEffect(() => {
        fetchTypesOfWork();
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th className="text-start">Name</th>
                    <th>Sort</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {typesOfWork.map((typeOfWork) => (
                    // Apply gray style to inactive companies
                    <tr className={!typeOfWork.active ? 'table-secondary text-muted' : ''} key={typeOfWork.id}>
                        <td>{typeOfWork.id}</td>
                        <td className="text-start">
                            {typeOfWork.name}
                        </td>
                        {/* Format the creation date */}
                        <td className="w-25">{typeOfWork.sort}</td>
                        <td>
                            {/* Edit button opens side panel */}
                            <Button variant="secondary" className="m-1" onClick={() => handleShowEditSidePanel(typeOfWork.id)}>
                                <i className="bi bi-pencil"></i>
                            </Button>

                            {/* Delete button opens modal */}
                            <Button variant="danger" className="m-1" onClick={() => handleShowDeleteModal(typeOfWork.id)}>
                                <i className="bi bi-trash"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Delete confirmation modal */}
            <DeleteModal
                id={id}
                showDeleteModal={showDeleteModal}
                handleCloseDeleteModal={handleCloseDeleteModal}
            />

            {/* Edit side panel */}
            <EditSidePanel
                id={id}
                showEditSidePanel={showEditSidePanel}
                handleCloseEditSidePanel={handleCloseEditSidePanel}
            />
        </>
    );
};

export default List;
