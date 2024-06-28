import { Button, Col, Container, Form, InputGroup, Row, Dropdown, Image, Spinner, Modal, Card, Navbar, Nav, NavDropdown } from "react-bootstrap";
import MainCard from "../components/card";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState, ReactNode } from "react";
import { useMainContext } from "../utils/context";
import { NavLink, Navigate, } from "react-router-dom";
import { NavbarComponent } from "../components/navbarComponent";


export interface TransactionListItemProps {
    id: number;
    hash: string;
    sol: number;
    token: number;
    action: string;
    status: ReactNode;
}

function HomePage() {

    const { isLogin, user, setUser } = useMainContext();
    let _user = window.localStorage.getItem('user');

    let token = window.localStorage.getItem('token');

    const headers = {
        authorization: `${token}`
    }

    if (!user && _user === '') {
        return (
            <Navigate to="/" replace />
        )
    }


    return (
        <div className="HomePage">
            <NavbarComponent/>
        </div >
    );
}

export default HomePage;
