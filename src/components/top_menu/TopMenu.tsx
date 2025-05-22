import React from 'react';
import {Button, Container, Navbar} from "react-bootstrap";

interface TopMenuProps {
    setShow:React.Dispatch<React.SetStateAction<boolean>>
}

const TopMenu = ({setShow}:TopMenuProps) => {
    const handleShow = () => setShow(true);
    return (
        <Navbar className="bg-body-tertiary mb-1">
            <Container>
                {/* Mobile top navbar */}
                <Navbar className="d-md-none bg-light pe-3 py-2 d-block">
                    <div className="mt-3 d-md-none">
                        <Button variant="outline-primary" onClick={handleShow}>
                            <i className="bi bi-list"></i>
                        </Button>
                    </div>
                </Navbar>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopMenu;