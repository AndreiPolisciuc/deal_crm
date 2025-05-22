import React, {useState} from 'react';
import {usePlanStore} from "../../store/usePlanStore";
import {Button, Col, Form, Row} from "react-bootstrap";
import {PlanInputAdd} from "../../types/Plan";

type PlanAddFormProps = {
    handleClose:()=>void,
    construction_id: number
}

const AddForm = ({handleClose, construction_id}:PlanAddFormProps) => {
    const [form, setForm] = useState<PlanInputAdd>({ name: '', construction_id});
    const [validated, setValidated] = useState(false);
    const addPlan = usePlanStore(state=> state.addPlan)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        await addPlan(form);
        setForm({ name: '', construction_id });
        handleClose()
    };
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col className="mb-3 text-start ">
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Plan name*</Form.Label>
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            placeholder="Plan Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Button className={"mx-1"}  type="submit">Create</Button>
                <Button onClick={handleClose} className={"mx-1"} variant={"danger"} >Cancel</Button>
            </Col>
        </Form>
    );
};

export default AddForm;