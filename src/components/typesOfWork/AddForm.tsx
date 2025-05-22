import React, {useState} from 'react';
import {TypeOfWorkInput} from "../../types/TypeOfWork";
import {useTypeOfWorkStore} from "../../store/useTypeOfWorkStore";
import {Button, Col, Form, Row} from "react-bootstrap";

type AddFormProps = {
    handleClose:()=>void
}

const AddForm = ({handleClose}:AddFormProps) => {
    const [form, setForm] = useState<TypeOfWorkInput>({ name: '', text: '', sort: 500 });
    const [validated, setValidated] = useState(false);
    const addTypeOfWork = useTypeOfWorkStore(state => state.addTypeOfWork);

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

        await addTypeOfWork(form);
        setForm({ name: '', text: '', sort: 500 });
        handleClose()
    };
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
                            defaultValue={500}
                            value={form.sort}
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