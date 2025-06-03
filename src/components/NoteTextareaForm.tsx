import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useHouseStore} from "../store/useHouseStore";

type Props = {
    id:number,
    note:string,
    filterHouses:()=>void;
}

const NoteTextareaForm = ({id, note, filterHouses}: Props) => {
    const {changeNote} =useHouseStore()
    const[newNote, setNewNote] = useState(note);

    return (
        <Form>
            <Form.Group controlId="noteText">
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Input note..."
                    value={newNote}
                    onChange={(event)=>setNewNote(event.target.value)}
                />
            </Form.Group>

            <Button
                variant="primary"
                className="mt-2"
                onClick={async () => {
                    await changeNote(id, newNote);
                    filterHouses();
                }}
            >
                Save
            </Button>
        </Form>

    );
};

export default NoteTextareaForm;