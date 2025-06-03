import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { useStatusStore } from '../../store/useStatusStore';
import DeleteModal from "./DeleteModal";
import EditSidePanel from "./EditSidePanel";

const List = () => {
    // Destructure state and action from company store
    const { statuses, fetchStatuses } = useStatusStore();

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
        fetchStatuses();
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
                {statuses.map((status) => (
                    // Apply gray style to inactive companies
                    <tr className={!status.active ? 'table-secondary text-muted' : ''} style={{ '--bs-table-bg': status.color } as React.CSSProperties} key={status.id}>
                        <td>{status.id}</td>
                        <td className="text-start">
                            {status.name}
                        </td>
                        {/* Format the creation date */}
                        <td className="w-25">{status.sort}</td>
                        <td>
                            {/* Edit button opens side panel */}
                            <Button variant="secondary" className="m-1" onClick={() => handleShowEditSidePanel(status.id)}>
                                <i className="bi bi-pencil"></i>
                            </Button>

                            {/* Delete button opens modal */}
                            { (status.id !== 5 && status.id !== 1) && <Button variant="danger" className="m-1" onClick={() => handleShowDeleteModal(status.id)}>
                                <i className="bi bi-trash"></i>
                            </Button>}
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
