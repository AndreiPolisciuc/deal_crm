import React, {useState} from 'react';
import { Nav, Offcanvas} from 'react-bootstrap';
import {
    BarChart, Briefcase,
    Building,
    CheckSquare,
    FileEarmark,
    Gear,
    House,
    People,
    PersonLinesFill, Speedometer2
} from "react-bootstrap-icons";
import { NavLink } from 'react-router-dom';

import './LeftMenu.css'

interface LeftMenuProps {
    show:boolean,
    setShow:React.Dispatch<React.SetStateAction<boolean>>
}

type MenuItem = {
    label: string;
    icon: React.ReactNode;
    link: string;
};

const LeftMenu = ({show, setShow}:LeftMenuProps) => {

    const handleClose = () => setShow(false);

    const menuItems:MenuItem[] = [
        { label: 'Dashboard', icon: <Speedometer2 />, link: '/' },
        //{ label: 'Users', icon: <People />, link: '#' },
        { label: 'Houses', icon: <House />, link: '/houses' },
        { label: 'Companies', icon: <Building />, link: '/companies' },
        { label: 'Types of work', icon: <Briefcase />, link: '/type-of-work' },
        { label: 'Statuses', icon: <CheckSquare />, link: '/statuses/' },
        // { label: 'Reports', icon: <BarChart />, link: '#' },
        // { label: 'Settings', icon: <Gear />, link: '#' },
    ];

    return (
        <>
            {/* Desktop sidebar */}
            <div className="d-none d-md-block sidebar">
                <div className="px-3 pt-3">
                    <img className={"logo mx-1"} src={`${process.env.PUBLIC_URL}/images/logo-1.jpg`} alt="logo"/>
                </div>

                <hr></hr>
                <Nav className="flex-column">
                    {menuItems.map(({ label, icon, link }) => (
                        <NavLink
                            to={link}
                            className={({ isActive }) => `menu-item  ${isActive ? 'active' : ''}`}
                            key={label}
                        >
                            <span className="me-2">{icon}</span>
                            {label}
                        </NavLink>
                    ))}
                </Nav>
            </div>



            {/* Offcanvas for mobile */}
            <Offcanvas className="d-md-none" show={show} onHide={handleClose} responsive="md">
                <Offcanvas.Header closeButton>
                    <div className="ps-3 pt-3">
                        <img className={"logo ms-1"} src={`${process.env.PUBLIC_URL}/images/logo-1.jpg`} alt="logo"/>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        {menuItems.map(({ label, icon, link }) => (
                            <NavLink
                                onClick={handleClose}
                                to={link}
                                className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                                key={label}
                            >
                                <span className="me-2">{icon}</span>
                                {label}
                            </NavLink>
                        ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default LeftMenu;