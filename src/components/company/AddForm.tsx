import React, { useState} from 'react';
import { CompanyInput } from '../../types/Company';
import { useCompanyStore } from '../../store/useCompanyStore';
import {Button, Col, Form, Row} from "react-bootstrap";

type CompanyFormProps = {
    handleClose:()=>void
}

const AddForm: React.FC<CompanyFormProps> = ({handleClose}) => {
    const [form, setForm] = useState<CompanyInput>({ name: '', text: '' });
    const [validated, setValidated] = useState(false);
    const addCompany = useCompanyStore(state => state.addCompany);

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

        await addCompany(form);
        setForm({ name: '', text: '' });
        handleClose()
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col className="mb-3 text-start ">
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Company name*</Form.Label>
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