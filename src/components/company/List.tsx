import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { useCompanyStore } from '../../store/useCompanyStore';
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import EditSidePanel from "./EditSidePanel";

const List = () => {
    // Destructure state and action from company store
    const { companies, fetchCompanies } = useCompanyStore();

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
        fetchCompanies();
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th className="text-start">Name</th>
                    <th>Created at</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {companies.map((company) => (
                    // Apply gray style to inactive companies
                    <tr className={!company.active ? 'table-secondary text-muted' : ''} key={company.id}>
                        <td>{company.id}</td>
                        <td className="text-start">
                            {/* Link to company detail page */}
                            <Link to={`/companies/${company.id}`}>
                                {company.name}
                            </Link>
                        </td>
                        {/* Format the creation date */}
                        <td className="w-25">{new Date(company.created_at).toLocaleString()}</td>
                        <td>
                            {/* Edit button opens side panel */}
                            <Button variant="secondary" className="m-1" onClick={() => handleShowEditSidePanel(company.id)}>
                                <i className="bi bi-pencil"></i>
                            </Button>

                            {/* Delete button opens modal */}
                            <Button variant="danger" className="m-1" onClick={() => handleShowDeleteModal(company.id)}>
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
