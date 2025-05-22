import React, {useState} from 'react';
import {useConstructionStore} from "../../store/useConstructionStore";
import {Button, Col, Form, Row} from "react-bootstrap";
import {ConstructionInputAdd} from "../../types/Construction";

type ConstructionAddFormProps = {
    handleClose:()=>void,
    company_id: number
}

const AddForm = ({handleClose, company_id}:ConstructionAddFormProps) => {
    const [form, setForm] = useState<ConstructionInputAdd>({ name: '', text: '', company_id, location:''});
    const [validated, setValidated] = useState(false);
    const addConstruction = useConstructionStore(state=> state.addConstruction)

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

        await addConstruction(form);
        setForm({ name: '', text: '', company_id, location:'' });
        handleClose()
    };
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col className="mb-3 text-start ">
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Construction name*</Form.Label>
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
                    <Form.Group controlId="validationCustom03">
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

                <Button className={"mx-1"}  type="submit">Create</Button>
                <Button onClick={handleClose} className={"mx-1"} variant={"danger"} >Cancel</Button>
            </Col>
        </Form>
    );
};

export default AddForm;