import React, { useEffect, useState } from 'react';
import {Accordion, Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useConstructionStore } from '../store/useConstructionStore';
import { useTypeOfWorkStore } from '../store/useTypeOfWorkStore';
import { useStatusStore } from '../store/useStatusStore';
import { useUserStore } from '../store/useUserStore';
import Select, { SingleValue } from 'react-select';
import {useHouseStore} from "../store/useHouseStore";
import {Link} from "react-router-dom";
import NoteTextareaForm from "../components/NoteTextareaForm";
import {useMediaQuery} from "react-responsive";
import {format} from "date-fns-tz";

type Option = {
    value: string;
    label: string;
};
type VoidFunction = () => void;

const Houses = () => {
    // Fetch stores
    const { constructions, fetchConstructions } = useConstructionStore();
    const { typesOfWork, fetchActiveTypesOfWork } = useTypeOfWorkStore();
    const { statuses, fetchStatuses } = useStatusStore();
    const { users, fetchActiveUsers } = useUserStore();
    const {housesFiltered, fetchFilterHouses, changeStatus, changeDate, changeUser} = useHouseStore();

    // Local state for selected options
    const [selectedTypeOfWork, setSelectedTypeOfWork] = useState<Option | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
    const [selectedPerformer, setSelectedPerformer] = useState<Option | null>(null);
    const [selectedConstruction, setSelectedConstruction] = useState<Option | null>(null);
    const [houseName, setHouseName] = useState<string>('');

    const isMobile = useMediaQuery({ maxWidth: 767 });

    function parseLocalDate(dateStr: string | null | undefined): Date | null {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;

        // Создаем "локальную" дату без UTC-сдвига
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    }


    const reset = () =>{
        setSelectedConstruction(null);
        setSelectedStatus(null);
        setSelectedPerformer(null);
        setSelectedTypeOfWork({ value: typesOfWork[0].id.toString(), label: typesOfWork[0].name });
        setHouseName('');
        fetchFilterHouses(
            selectedTypeOfWork?.value || '',
            selectedStatus?.value || '',
            selectedPerformer?.value || '',
            selectedConstruction?.value || '',
            houseName,
            ''
        );
    }

    // Fetch data when component mounts
    useEffect(() => {
        fetchActiveTypesOfWork();
        fetchConstructions();
        fetchStatuses();
        fetchActiveUsers();
    }, []);

    useEffect(() => {
        if (typesOfWork.length > 0) {
            const first = typesOfWork[0];
            fetchFilterHouses(first.id.toString(), '', '', '', '', '');
            setSelectedTypeOfWork({ value: first.id.toString(), label: first.name });
        }
    }, [typesOfWork]);

    const filterHouses = () => {
        fetchFilterHouses(
            selectedTypeOfWork?.value || '',
            selectedStatus?.value || '',
            selectedPerformer?.value || '',
            selectedConstruction?.value || '',
            houseName,
            ''
        );
    };

    return (
        <Container>
            <h1>Houses</h1>
            <hr />
            <Accordion {...(!isMobile ? { defaultActiveKey: "0" } : {})}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <i className="bi bi-funnel me-2"></i>
                        Filters
                    </Accordion.Header>
                    <Accordion.Body>
                        <Form className="mb-4">
                            <Row className="g-3">
                                {/* Type of Work Selector */}
                                <Col xs={12} md={4}>
                                    <Form.Group controlId="typeOfWork">
                                        <Form.Label>Type of Work</Form.Label>
                                        <Select
                                            options={typesOfWork.map(({ id, name }) => ({
                                                value: id.toString(),
                                                label: name,
                                            }))}

                                            placeholder="All"
                                            value={selectedTypeOfWork}
                                            onChange={(value) => setSelectedTypeOfWork(value)}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Status Selector */}
                                <Col xs={12} md={4}>
                                    <Form.Group controlId="status">
                                        <Form.Label>Status</Form.Label>
                                        <Select
                                            options={statuses.map(({ id, name }) => ({
                                                value: id.toString(),
                                                label: name,
                                            }))}
                                            isClearable
                                            placeholder="All"
                                            value={selectedStatus}
                                            onChange={(value) => setSelectedStatus(value)}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Performer Selector */}
                                <Col xs={12} md={4}>
                                    <Form.Group controlId="performer">
                                        <Form.Label>Performer</Form.Label>
                                        <Select
                                            options={users.map(({ id, name }) => ({
                                                value: id.toString(),
                                                label: name,
                                            }))}
                                            isClearable
                                            placeholder="All"
                                            value={selectedPerformer}
                                            onChange={(value) => setSelectedPerformer(value)}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Construction Selector */}
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="construction">
                                        <Form.Label>Construction</Form.Label>
                                        <Select
                                            options={constructions.map(({ id, name }) => ({
                                                value: id.toString(),
                                                label: name,
                                            }))}
                                            isClearable
                                            placeholder="All"
                                            value={selectedConstruction}
                                            onChange={(value) => setSelectedConstruction(value)}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* House Name Input */}
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="houseName">
                                        <Form.Label>House Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="houseName"
                                            placeholder="Enter house name"
                                            value={houseName}
                                            onChange={(event)=>setHouseName(event.target.value)}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Action Buttons */}
                                <Col xs={12} className="d-flex justify-content-end gap-2">
                                    <Button variant="secondary" onClick={reset}>
                                        Reset
                                    </Button>
                                    <Button onClick={filterHouses} variant="primary">
                                        Filter
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <h2>{housesFiltered[0]?.type_of_work_name}</h2>


            {!isMobile ? (<Table striped bordered hover responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th className="text-start">House</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Performer</th>
                    <th>Note</th>
                </tr>
                </thead>
                <tbody>
                {housesFiltered.map((house) => (
                    <tr key={house.id}>
                        <td className={"align-middle"}>{house.house_id}</td>
                        <td className="text-start align-middle w-25">

                            <b >Lot {house.house_name}</b>
                            <div className={"d-block"}>
                                <Link className={"me-2"} to={`/companies/${house.company_id}/${house.construction_id}`}>
                                    {house.construction_name}
                                </Link>
                                <i>
                                    <Link to={`/companies/${house.company_id}/${house.construction_id}/${house.plan_id}`}>
                                        ({house.plan_name})
                                    </Link>
                                </i>
                            </div>



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

                        <td className={"align-middle "} style={{ width: '140px' }}>
                            <DatePicker
                                selected={parseLocalDate(house.target_date)}
                                onChange={async (date: Date | null) => {
                                    if (!date) return;
                                    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');

                                    await changeDate(house.id, formattedDate);
                                    filterHouses();
                                }}
                                className="form-control"
                            />


                        </td>
                        <td className={"align-middle"}>
                            <Form.Select
                                required
                                name="status_id"
                                style={{
                                    backgroundColor: house.status_color,
                                    color: 'white',
                                }}
                                onChange={async (event) => {
                                    const value = event.target.value;
                                    await changeStatus(house.id, value);
                                    filterHouses();
                                }}
                            >
                                {statuses.map((status) => (
                                    <option style={{backgroundColor: status.color}}
                                            selected={status.id === house.status_id}
                                            value={status.id}>{status.name}</option>
                                ))}


                            </Form.Select>

                        </td>
                        <td className={"align-middle"}>
                            <Form.Select
                                required
                                name="user_id"
                                onChange={async (event) => {
                                    const value = event.target.value;
                                    await changeUser(house.id, value);
                                    filterHouses();
                                }}
                            >
                                <option selected hidden disabled>Select User</option>
                                {users.map((user) => (
                                    <option selected={user.id === house.user_id} value={user.id}>{user.name}</option>
                                ))}


                            </Form.Select>

                        </td>
                        <td className={"align-middle text-end"}>
                            <NoteTextareaForm id={house.id} note={house.note}  filterHouses={filterHouses}/>
                        </td>
                    </tr>
                ))}

                </tbody>
            </Table>) : (<>
                 {housesFiltered.map((house) => (
                    <Card key={house.id} className="mb-2">
                        <Card.Body>
                            <div>
                                <b >Lot {house.house_name}</b>
                                <div className={"d-block"}>
                                    <Link className={"me-2"} to={`/companies/${house.company_id}/${house.construction_id}`}>
                                        {house.construction_name}
                                    </Link>
                                    <i>
                                        <Link to={`/companies/${house.company_id}/${house.construction_id}/${house.plan_id}`}>
                                            ({house.plan_name})
                                        </Link>
                                    </i>
                                </div>
                            </div>
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
                            <hr></hr>
                            <div>
                                <span className={"d-block"}>Target Date:</span>
                                <DatePicker
                                    selected={parseLocalDate(house.target_date)}
                                    onChange={async (date: Date | null) => {
                                        if (!date) return;

                                        const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');

                                        await changeDate(house.id, formattedDate);
                                        filterHouses();
                                    }}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <span className={"d-block"}>Status:</span>
                                <Form.Select
                                    required
                                    name="status_id"
                                    style={{
                                        backgroundColor: house.status_color,
                                        color: 'white',
                                    }}
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        await changeStatus(house.id, value);
                                        filterHouses();
                                    }}
                                >
                                    {statuses.map((status) => (
                                        <option style={{backgroundColor: status.color}}
                                                selected={status.id === house.status_id}
                                                value={status.id}>{status.name}</option>
                                    ))}


                                </Form.Select>
                            </div>
                            <div>
                                <span className={"d-block"}>Performer:</span>
                                <Form.Select
                                    required
                                    name="user_id"
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        await changeUser(house.id, value);
                                        filterHouses();
                                    }}
                                >
                                    <option selected hidden disabled>Select User</option>
                                    {users.map((user) => (
                                        <option selected={user.id === house.user_id} value={user.id}>{user.name}</option>
                                    ))}


                                </Form.Select>
                            </div>
                            <hr></hr>
                            <div>
                                <NoteTextareaForm id={house.id} note={house.note}  filterHouses={filterHouses}/>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
                 </>)
            }

        </Container>
    );
};

export default Houses;
