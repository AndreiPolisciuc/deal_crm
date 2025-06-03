import React, {useState} from 'react';
import {usePlanStore} from "../../store/usePlanStore";
import {Button, Col, Form, Row} from "react-bootstrap";
import {usePlanInformationStore} from "../../store/usePlanInformationStore";
import {PlanInformationInputAdd} from "../../types/PlanInformation";

type Props = {
    handleClose:()=>void,
    typeOfWorkId:number
}

const AddInformationForm = ({handleClose, typeOfWorkId}:Props) => {
    const plan = usePlanStore(state=> state.plan)
    const addPlanInformation = usePlanInformationStore(state=> state.addPlanInformation)
    const [form, setForm] = useState<PlanInformationInputAdd>({ name: '',type_of_work_id:typeOfWorkId, plan_id:plan.id, text:'', file: null, type_of_file:''});
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
        await addPlanInformation(form);
        setForm({ name: '', text:'', type_of_work_id:0, plan_id:plan.id, file: null, type_of_file:'' });
        handleClose()
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setForm({ ...form, file: e.target.files[0] });
        }
    };


    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col className="mb-3 text-start ">
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3 text-start ">
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control
                            name={"file"}
                            onChange={handleFileChange}
                            type="file"
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

export default AddInformationForm;