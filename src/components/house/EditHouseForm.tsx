import React, {useEffect, useState} from 'react';
import {useHouseStore} from "../../store/useHouseStore";
import {Button, Col, Form, Row} from "react-bootstrap";
import {HouseInputEdit} from "../../types/House";
import {usePlanStore} from "../../store/usePlanStore";

type HouseEditFormProps = {
    id:number,
    handleCloseEditSidePanel:()=>void
}

const EditHouseForm = ({id, handleCloseEditSidePanel}:HouseEditFormProps) => {
    const {house, fetchHouse, updateHouse} = useHouseStore();
    const [form, setForm] = useState<HouseInputEdit>({id:0, name: '', active:true, construction_id: 0, plan_id:0, state:'CA', city:'', street:'', unit:'', zip_code:''});
    const {plans, fetchPlansInConstruction} = usePlanStore();
    const [validated, setValidated] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const data = e.currentTarget as HTMLFormElement;
        e.preventDefault();

        if (data.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (data.checkValidity() === false) return;

        await updateHouse(form);
        setForm({id:0, name: '', active: true,  construction_id: 0, plan_id: 0, state:'CA', city:'', street:'', unit:'', zip_code:'' });
        handleCloseEditSidePanel()
    };

    useEffect(() => {
        fetchHouse(id);
    }, []);
    useEffect(() => {
        setForm({...house});
        fetchPlansInConstruction(house.construction_id)
    }, [house]);
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col className="mb-3 text-start ">
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>House Name</Form.Label>
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            placeholder="House Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationPlan">
                        <Form.Label>Plan*</Form.Label>
                        <Form.Select
                            required
                            name="plan_id"
                            value={form.plan_id}
                            onChange={handleChange}
                        >
                            <option value='' disabled hidden>Select a plan</option>
                            {plans.map((plan)=>(
                                <option value={plan.id}>{plan.name}</option>
                            ))}


                        </Form.Select>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3 text-start ">
                    <Form.Group>
                        <Form.Check
                            checked={form.active}
                            type="switch"
                            id="custom-switch"
                            label="Active"
                            onChange={(e) => setForm({
                                ...form, active: e.target.checked
                            })}
                        />
                    </Form.Group>

                </Row>

                <h6>Address</h6>
                <Row className="mb-3 text-start ">
                    <Form.Group>
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            name="street"
                            type="text"
                            placeholder="2557 Albatross Wy"
                            value={form.street}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3 text-start ">
                    <Col md={'6'}>
                        <Form.Group>
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                                name="unit"
                                type="text"
                                placeholder="Unit B"
                                value={form.unit}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={'6'}>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                name="city"
                                type="text"
                                placeholder="Sacramento"
                                value={form.city}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3 text-start ">
                    <Col md={'6'}>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                name="state"
                                type="text"
                                placeholder="CA"
                                value={form.state}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={'6'}>
                        <Form.Group>
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                name="zip_code"
                                type="text"
                                placeholder="95815"
                                value={form.zip_code}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>


                <Button className={"mx-1"} type="submit">Update</Button>
                <Button onClick={handleCloseEditSidePanel} className={"mx-1"} variant={"danger"}>Cancel</Button>
            </Col>
        </Form>
    );
};

export default EditHouseForm;