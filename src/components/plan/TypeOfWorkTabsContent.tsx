import React, {useState} from 'react';
import { PlanInformation } from "../../types/PlanInformation";
import {Accordion, Button} from "react-bootstrap";
import {SERVER_LINK} from "../../globals";
import SafePdfViewer from "../SafePdfViewer";
import DeleteModalInformation from "./DeleteModalInformation";

type Props = {
    planInformations: PlanInformation[],
    type_of_work_id: number
};

const TypeOfWorkTabsContent = ({ planInformations, type_of_work_id }: Props) => {

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

    return (
        <>
            <Accordion >
                {planInformations
                    .filter(item => item.type_of_work_id === type_of_work_id)
                    .map(item => (

                            <Accordion.Item eventKey={item.id.toString()}>
                                <Accordion.Header>{item.name}</Accordion.Header>
                                <Accordion.Body>
                                    <div className={'d-flex justify-content-end'}>
                                        <Button className={"m-1"} variant="danger" onClick={() => handleShowDeleteModal(item.id)}>
                                            <i className="bi bi-trash me-2"></i>
                                            Delete
                                        </Button>
                                    </div>
                                    {item.text && <pre>{item.text}</pre>}
                                    {item.type_of_file && (item.type_of_file !== 'application/pdf' ?
                                            <img style={{maxWidth: "100%"}}
                                                 src={SERVER_LINK + "/uploads/" + item.file}/> :
                                            <SafePdfViewer src={SERVER_LINK + "/uploads/" + item.file}/>
                                    )

                                    }
                                </Accordion.Body>
                            </Accordion.Item>

                    ))
                }
            </Accordion>
            <DeleteModalInformation
                id={id}
                showDeleteModal={showDeleteModal}
                handleCloseDeleteModal={handleCloseDeleteModal}
            />
        </>
    );
};

export default TypeOfWorkTabsContent;
