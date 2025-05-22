import React, {useEffect, useState} from 'react';
import {usePlanStore} from "../../store/usePlanStore";
import {Button, Col, Form, Row} from "react-bootstrap";
import {PlanInputEdit} from "../../types/Plan";

type PlanEditFormProps = {
    id:number,
    handleCloseEditSidePanel:()=>void
}

const EditForm = ({id, handleCloseEditSidePanel}:PlanEditFormProps) => {
    const {plan, fetchPlan, updatePlan} = usePlanStore();
    const [form, setForm] = useState<PlanInputEdit>({id:0, name: '', active:true, construction_id: 0});
    const [validated, setValidated] = useState(false);

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

        await updatePlan(form);
        setForm({id:0, name: '', active: true,  construction_id: 0 });
        handleCloseEditSidePanel()
    };

    useEffect(() => {
        fetchPlan(id);
    }, []);
    useEffect(() => {
        setForm({id:id, name: plan?.name, active:plan?.active, construction_id:plan?.construction_id});
    }, [plan]);
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col className="mb-3 text-start ">
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Company name</Form.Label>
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            placeholder="Company Name"
                            value={form.name}
                            onChange={handleChange}
                        />
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
                            onChange={(e)=>setForm({...form, active: e.target.checked
                            })}
                        />
                    </Form.Group>

                </Row>

                <Button className={"mx-1"}  type="submit">Update</Button>
                <Button onClick={handleCloseEditSidePanel} className={"mx-1"} variant={"danger"} >Cancel</Button>
            </Col>
        </Form>
    );
};

export default EditForm;