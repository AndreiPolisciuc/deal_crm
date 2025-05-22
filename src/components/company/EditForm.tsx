import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import { CompanyInputEdit} from "../../types/Company";
import {useCompanyStore} from "../../store/useCompanyStore";

type CompanyEditFormProps = {
    id:number,
    handleCloseEditSidePanel:()=>void
}

const EditForm = ({id, handleCloseEditSidePanel}:CompanyEditFormProps) => {
    const { company, fetchCompany, updateCompany  } = useCompanyStore();
    const [form, setForm] = useState<CompanyInputEdit>({id:0, name: '', text: '', active:true});
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

        await updateCompany(form);
        setForm({id:0, name: '', text: '', active: true });
        handleCloseEditSidePanel()
    };

    useEffect(() => {
        fetchCompany(id);
    }, []);
    useEffect(() => {
        setForm({id:id, name: company?.name, text: company?.text, active:company?.active});
    }, [company]);
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
                <Row className="mb-3 text-start">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label >Example textarea</Form.Label>
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