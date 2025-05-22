import React, {useEffect, useState} from 'react';
import {usePlanStore} from "../../store/usePlanStore";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import DeleteModal from "./DeleteModal";
import EditSidePanel from './EditSidePanel';

type PlanTableProps = {
    construction_id: number;
}

const List = ({construction_id}:PlanTableProps) => {
    const { plans, fetchPlansInConstruction  } = usePlanStore();
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
        fetchPlansInConstruction(construction_id);
    }, [construction_id]);

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
                {plans.map((plan) => (
                    <tr className={!plan.active ? 'table-secondary text-muted' : ''} key={plan.id}>
                        <td>{plan.id}</td>
                        <td className="text-start">
                            <Link to={`/companies/${plan.construction_id}/${plan.id}`}>
                                {plan.name}
                            </Link>
                        </td>

                        <td className="w-25">{new Date(plan.created_at).toLocaleString()}</td>
                        <td>
                            {/* Edit button opens side panel */}
                            <Button variant="secondary" className="m-1" onClick={() => handleShowEditSidePanel(plan.id)}>
                                <i className="bi bi-pencil"></i>
                            </Button>

                            <Button className={"m-1"} variant="danger" onClick={() => handleShowDeleteModal(plan.id)}>
                                <i className="bi bi-trash"></i>
                            </Button>

                        </td>
                    </tr>
                ))}

                </tbody>
            </Table>
            <DeleteModal
                id={id}
                construction_id={construction_id}
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