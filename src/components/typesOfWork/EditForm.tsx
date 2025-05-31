import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useCompanyStore} from "../../store/useCompanyStore";
import {useTypeOfWorkStore} from "../../store/useTypeOfWorkStore";
import {TypeOfWorkInputEdit} from "../../types/TypeOfWork";

type EditFormProps = {
    id:number,
    handleCloseEditSidePanel:()=>void
}

const EditForm = ({id, handleCloseEditSidePanel}:EditFormProps) => {
    const { typeOfWork, fetchTypeOfWork,  updateTypeOfWork } = useTypeOfWorkStore();
    const [form, setForm] = useState<TypeOfWorkInputEdit>({id:0, name: '', text: '', active:true, sort:500});
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

        await updateTypeOfWork(form);
        setForm({id:0, name: '', text: '', active: true , sort: 500 });
        handleCloseEditSidePanel()
    };

    useEffect(() => {
        fetchTypeOfWork(id);
    }, []);
    useEffect(() => {
        setForm({id:id, name: typeOfWork?.name, text: typeOfWork?.text, active:typeOfWork?.active, sort:typeOfWork?.sort});
    }, [typeOfWork]);
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col className="mb-3 text-start ">
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Type Of Work Name*</Form.Label>
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            placeholder="Type Of Work Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Sort*</Form.Label>
                        <Form.Control
                            name="sort"
                            required
                            type="number"
                            value={form.sort}
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