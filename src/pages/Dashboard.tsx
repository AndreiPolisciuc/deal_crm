import React, {useEffect} from 'react';
import { Card,  Container, Form,  Table} from "react-bootstrap";
import {useStatusStore} from "../store/useStatusStore";
import {useUserStore} from "../store/useUserStore";
import {useHouseStore} from "../store/useHouseStore";
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";
import NoteTextareaForm from "../components/NoteTextareaForm";

const Dashboard = () => {
    // Fetch stores
    const { statuses, fetchStatuses } = useStatusStore();
    const { user, fetchUser } = useUserStore();
    const {housesFiltered, fetchFilterHouses, changeStatus} = useHouseStore();
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const dateStr = `${year}-${month}-${day} 12:00:00`;

    const isMobile = useMediaQuery({ maxWidth: 767 });

    housesFiltered.sort((a, b) => new Date(a.target_date).getTime() - new Date(b.target_date).getTime());
    const groupedByDate: Record<string, typeof housesFiltered> = {};
    for (const item of housesFiltered) {
        const dateKey = item.target_date.slice(0, 10);

        if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = [];
        }

        groupedByDate[dateKey].push(item);
    }

    // Fetch data when component mounts
    useEffect(() => {
        fetchStatuses();
        fetchUser(2);
        filterHouses();
    }, []);

    const filterHouses = () => {
        fetchFilterHouses(
            '',
             '',
            '2',
            '',
            '',
            dateStr
        );
    };

    return (
        <Container>
            <h1>Dashboard</h1>
            <hr />
            <h4>{user.name}</h4>
            {!isMobile ? (
                Object.entries(groupedByDate).map(([date, items]) => (
                        <div key={date}>
                            <h5>{date}</h5>
                        <Table striped bordered hover responsive="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-start">House</th>
                            <th className="text-start">Type Of work</th>
                            <th>Status</th>
                            <th>Note</th>
                        </tr>
                        </thead>
                            <tbody>
                        {items.map((house) => (
                            <tr key={house.id}>
                                <td className={"align-middle"}>{house.house_id}</td>
                                <td className="text-start align-middle w-25">

                                    <b>Lot {house.house_name}</b>
                                    <div className={"d-block"}>
                                        <Link className={"me-2"}
                                              to={`/companies/${house.company_id}/${house.construction_id}`}>
                                            {house.construction_name}
                                        </Link>
                                        <i>
                                            <Link
                                                to={`/companies/${house.company_id}/${house.construction_id}/${house.plan_id}`}>
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
                                <td className={"align-middle"}>
                                    {house.type_of_work_name}
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
                                <td className={"align-middle text-end"}>
                                    <NoteTextareaForm id={house.id} note={house.note} filterHouses={filterHouses}/>
                                </td>
                            </tr>
                        ))}

                            </tbody>
                    </Table>
                        </div>))) : (Object.entries(groupedByDate).map(([date, items]) => (
                            <div key={date}>
                                <h5>{date}</h5><>
                                {items.map((house) => (
                                    <Card key={house.id} className="mb-2">
                                        <Card.Body>
                                            <div>
                                                <b>Lot {house.house_name}</b>
                                                <div className={"d-block"}>
                                                    <Link className={"me-2"}
                                                          to={`/companies/${house.company_id}/${house.construction_id}`}>
                                                        {house.construction_name}
                                                    </Link>
                                                    <i>
                                                        <Link
                                                            to={`/companies/${house.company_id}/${house.construction_id}/${house.plan_id}`}>
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
                                                <label className={"me-1"}>Type Of Work:</label>
                                                {house.type_of_work_name}
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

                                            <hr></hr>
                                            <div>
                                                <NoteTextareaForm id={house.id} note={house.note}
                                                                  filterHouses={filterHouses}/>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </>
                            </div>)))
            }

        </Container>
    );
};

export default Dashboard;