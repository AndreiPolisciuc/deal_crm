import React, {useEffect, useState} from 'react';
import {useConstructionStore} from "../../store/useConstructionStore";
import {Button, Col, Form, Row} from "react-bootstrap";
import {ConstructionInputEdit} from "../../types/Construction";

type ConstructionEditFormProps = {
    id:number,
    handleCloseEditSidePanel:()=>void
}

const EditForm = ({id, handleCloseEditSidePanel}:ConstructionEditFormProps) => {
    const {construction, fetchConstruction, updateConstruction} = useConstructionStore();
    const [form, setForm] = useState<ConstructionInputEdit>({id:0, name: '', text: '', active:true, location:'', company_id: 0});
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

        await updateConstruction(form);
        setForm({id:0, name: '', text: '', active: true, location:'', company_id: 0 });
        handleCloseEditSidePanel()
    };

    useEffect(() => {
        fetchConstruction(id);
    }, []);
    useEffect(() => {
        setForm({id:id, name: construction?.name, text: construction?.text, active:construction?.active, company_id:construction?.company_id, location:construction?.location});
    }, [construction]);
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col className="mb-3 text-start ">
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Construction Name</Form.Label>
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            placeholder="Construction Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            name="location"
                            type="text"
                            placeholder="Location"
                            value={form.location}
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
                <Row className="mb-3 text-start">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label >Text</Form.Label>
                        <Form.Control
                            className="mb-3"
                            as="textarea"
                            rows={3}
                            name="text"
                            value={form.text}
                            onChange={handleChange}
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