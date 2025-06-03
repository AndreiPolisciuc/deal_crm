import React, {useEffect, useState} from 'react';
import {useHouseStore} from "../../store/useHouseStore";
import {Button, Card, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import DeleteModal from "./DeleteModalHouse";
import {usePlanStore} from "../../store/usePlanStore";
import {useMediaQuery} from "react-responsive";
import EditSidePanel from "./EditSidePanel";

type HouseTableProps = {
    construction_id: number;
}

const ListHouse = ({construction_id}:HouseTableProps) => {
    const { houses, fetchHousesInConstruction, housesStatuses,fetchHousesStatuses  } = useHouseStore();
    const{plans}=usePlanStore();
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [id, setId] = useState(0);

    const { company_id } = useParams<{company_id:string}>();

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
        fetchHousesInConstruction(construction_id);
    }, [construction_id]);
    useEffect(() => {
        fetchHousesStatuses(construction_id);
    }, [houses]);


    if (!isMobile) {
        return (
            <>

                <Table striped bordered hover responsive="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th className="text-start">Name</th>
                        <th>Plan</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {houses.map((house) => (
                        <tr className={!house.active ? 'table-secondary text-muted' : ''} key={house.id}>
                            <td className={"align-middle"}>{house.id}</td>
                            <td className="text-start align-middle">
                                <b>Lot {house.name}</b>


                                {(house.street && house.city && house.zip_code) &&
                                    <>
                                        <hr></hr>
                                        <span className="text-start me-2 d-block">Address:</span>
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${house.street} ${house.unit}, ${house.city}, ${house.state} ${house.zip_code}, USA`)}`}
                                           target="_blank" rel="noopener noreferrer">
                                            {house.street} {house.unit}, {house.city}, {house.state} {house.zip_code},
                                            USA
                                        </a>
                                    </>}

                            </td>

                            <td className={"align-middle"}>

                                {(() => {
                                    const plan = plans.find(plan => plan.id === house.plan_id);
                                    return plan ? (
                                        <Link to={`/companies/${company_id}/${house.construction_id}/${plan.id}`}>
                                            {plan.name}
                                        </Link>
                                    ) : (
                                        'Unknown'
                                    );
                                })()}
                            </td>
                            <td className={"align-middle"}>

                                {housesStatuses.filter(houseStatuses => houseStatuses.house_id === house.id)?.map((houseStatuses, index) => (
                                    <span
                                        key={index}
                                        className="badge text-white px-2 py-1 m-1"
                                        style={{backgroundColor: houseStatuses.status_color, fontSize: '0.9rem'}}
                                    >
                                  <strong>{houseStatuses.type_of_work_name}:</strong> {houseStatuses.status_name}
                                </span>
                                ))}
                            </td>
                            <td className={"align-middle"}>
                                {/* Edit button opens side panel */}
                                <Button variant="secondary" className="m-1"
                                        onClick={() => handleShowEditSidePanel(house.id)}>
                                    <i className="bi bi-pencil"></i>
                                </Button>
                                {(house.street && house.city && house.zip_code) &&
                                    <Button
                                        className={"m-1"}
                                        variant="secondary"
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${house.street} ${house.unit}, ${house.city}, ${house.state} ${house.zip_code}, USA`)}`}
                                        target="_blank"
                                    >
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </Button> }
                                <Button className={"m-1"} variant="danger"
                                        onClick={() => handleShowDeleteModal(house.id)}>
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
    }else{
        return (
            <>
                {houses.map(house => (
                <Card key={house.id} className="mb-2">
                    <Card.Body>
                        <strong>Lot {house.name}</strong>
                        <div>
                            <span className={"me-2"}>Plan:</span>
                            {(() => {
                                const plan = plans.find(plan => plan.id === house.plan_id);
                                return plan ? (
                                    <Link to={`/companies/${company_id}/${house.construction_id}/${plan.id}`}>
                                        {plan.name}
                                    </Link>
                                ) : (
                                    'Unknown'
                                );
                            })()}
                        </div>
                        {(house.street && house.city && house.zip_code) &&
                            <div>
                                <span className="text-start me-2 d-block">Address:</span>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${house.street} ${house.unit}, ${house.city}, ${house.state} ${house.zip_code}, USA`)}`}
                                   target="_blank" rel="noopener noreferrer">
                                    {house.street} {house.unit}, {house.city}, {house.state} {house.zip_code},
                                    USA
                                </a>
                            </div>}
                        <hr></hr>
                        <div>
                            <span className={"d-block"}>Statuses:</span>
                            {housesStatuses.filter(houseStatuses => houseStatuses.house_id === house.id)?.map((houseStatuses, index) => (
                                <span
                                    key={index}
                                    className="badge text-white px-2 py-1 m-1"
                                    style={{backgroundColor: houseStatuses.status_color, fontSize: '0.9rem'}}
                                >
                                  <strong>{houseStatuses.type_of_work_name}:</strong> {houseStatuses.status_name}
                                </span>
                            ))}
                        </div>
                        <hr></hr>
                        <div className={"d-flex justify-content-center"}>
                            {/* Edit button opens side panel */}
                            <Button variant="secondary" className="m-1 px-4"
                                    onClick={() => handleShowEditSidePanel(house.id)}>
                                <i className="bi bi-pencil"></i>
                            </Button>
                            {(house.street && house.city && house.zip_code) &&
                                <Button
                                    className={"m-1 px-4"}
                                    variant="secondary"
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${house.street} ${house.unit}, ${house.city}, ${house.state} ${house.zip_code}, USA`)}`}
                                    target="_blank"
                                >
                                    <i className="bi bi-geo-alt-fill"></i>
                                </Button> }
                            <Button className={"m-1 px-4"} variant="danger"
                                    onClick={() => handleShowDeleteModal(house.id)}>
                                <i className="bi bi-trash"></i>
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
                ))}
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
        )
    }

};

export default ListHouse;