import React, {useEffect, useState} from 'react';
import {useConstructionStore} from "../../store/useConstructionStore";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import DeleteModal from "./DeleteModal";
import EditSidePanel from "./EditSidePanel";

type ConstructionTableProps = {
    company_id: number;
}

const List = ({company_id}:ConstructionTableProps) => {
    const { constructions, fetchConstructionsInCompany  } = useConstructionStore();
    const [id, setId] = useState(0);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setId(0);
    }
    const handleShowDeleteModal = (id:number) => {
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



    useEffect(() => {
        fetchConstructionsInCompany(company_id);
    }, []);

    return (
        <>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th className="text-start" >Name</th>
                    <th>Created at</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {constructions.map((construction) => (
                    <tr className={!construction.active ? 'table-secondary text-muted' : ''} key={construction.id}>
                        <td>{construction.id}</td>
                        <td className="text-start">
                            <Link to={`/companies/${construction.company_id}/${construction.id}`}>
                                {construction.name}
                            </Link>
                        </td>

                        <td className="w-25">{new Date(construction.created_at).toLocaleString()}</td>
                        <td>
                            {/* Edit button opens side panel */}
                            <Button variant="secondary" className="m-1" onClick={() => handleShowEditSidePanel(construction.id)}>
                                <i className="bi bi-pencil"></i>
                            </Button>
                            {construction.location ? <Button className={"m-1"} variant="secondary" href={construction.location} target="_blank">
                                <i className="bi bi-geo-alt-fill"></i>
                            </Button> : ""}

                            <Button className={"m-1"} variant="danger" onClick={() => handleShowDeleteModal(construction.id)}>
                                <i className="bi bi-trash"></i>
                            </Button>

                        </td>
                    </tr>
                ))}

                </tbody>
            </Table>
            <DeleteModal
                id={id}
                company_id={company_id}
                showDeleteModal={showDeleteModal}
                handleCloseDeleteModal={handleCloseDeleteModal}
            />
            <EditSidePanel
                id={id}
                showEditSidePanel={showEditSidePanel}
                handleCloseEditSidePanel={handleCloseEditSidePanel}
            />

        </>
    );
};

export default List;