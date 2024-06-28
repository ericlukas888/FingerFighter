import { Button, Col, Container, Image, Modal, Nav, Navbar, Row, Form } from "react-bootstrap"
import { NavLink, Navigate } from "react-router-dom"
import MainCard from "./card"
import { useMainContext } from "../utils/context";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import SettingIcon from '../assets/images/setting.svg';
import LogoutIcon from '../assets/images/logout.svg';

export const NavbarComponent = () => {
    const { isLogin, user, setUser } = useMainContext();
    let _user = window.localStorage.getItem('user');
    const [show, setShow] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const [opassword, setOPassword] = useState<string>("");
    const [cpassword, setCPassword] = useState<string>("");


    let token = window.localStorage.getItem('token');

    const headers = {
        authorization: `${token}`
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updatePassword = async () => {
        if (opassword === "" || password === "" || cpassword === "") {
            toast.error("Please enter passwords");;
            return;
        }

        if (password !== cpassword) {
            toast.error("Passwords do not match.");;
            return;
        }

        const userData = JSON.parse(_user!);
        console.log("userData", userData)


        const body = {
            userId: userData.id,
            opassword: opassword,
            password: password,
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/admin/updatePassword`, body, { headers })
            .then(function (response) {
                toast.success(response.data.message);
                handleClose();
            })
            .catch(function (error) {
                toast.error(error.response.data.message);
            });
    }

    const logOut = async () => {
        setUser(null);
        window.localStorage.setItem('user', '');
        window.localStorage.setItem('token', '');
    }

    if (!user && _user === '') {
        return (
            <Navigate to="/" replace />
        )
    }

    return(
        <div className="NavbarComponent">
            <section className="py-5">
                <Container>
                    <Row>
                        <Col xs={6} lg={8} className="mb-3 text-start">
                            <Navbar collapseOnSelect expand="lg" className="p-0">
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="">
                                            <NavLink to="/home" className="nav-link ps-0 pe-5 fs-5 py-2 py-sm-0 text-uppercase fw-bold">Dashboard</NavLink>
                                            <NavLink to="/users" className="nav-link ps-0 pe-5 fs-5 py-2 py-sm-0 text-uppercase fw-bold">Users</NavLink>
                                            <NavLink to="/rankings" className="nav-link ps-0 pe-5 fs-5 py-2 py-sm-0 text-uppercase fw-bold">Rankings</NavLink>
                                            <NavLink to="/rewards" className="nav-link ps-0 pe-5 fs-5 py-2 py-sm-0 text-uppercase fw-bold">Rewards</NavLink>
                                            <NavLink to="/games" className="nav-link ps-0 pe-5 fs-5 py-2 py-sm-0 text-uppercase fw-bold">Games</NavLink>
                                        </Nav>
                                    </Navbar.Collapse>
                            </Navbar>
                        </Col>
                        <Col xs={6} lg={4} className="mb-3 text-end">
                            <Button className="mb-3 ms-3 text-center rounded-0 py-1 px-2 bg-transparent border-1 Main-btn" onClick={handleShow}><Image src={SettingIcon} width={20} alt="clipboard" className="mb-1" /></Button>
                            <Button className="mb-3 ms-3 text-center rounded-0 py-1 px-2 bg-transparent border-1 Main-btn" onClick={logOut}><Image src={LogoutIcon} width={20} alt="clipboard" className="mb-1" /></Button>
                        </Col>
                    </Row>
                </Container >
            </section >
            <Modal show={show} onHide={handleClose} centered data-bs-theme="dark">
                <Modal.Body className="p-0">
                    <MainCard title="Update Password">
                        <Col sm={12} lg={12} className="mb-3">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type="password" className="rounded-0 bg-transparent" value={opassword} onChange={(e) => setOPassword(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col sm={12} lg={12} className="mb-3">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" className="rounded-0 bg-transparent" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col sm={12} lg={12} className="mb-3">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" className="rounded-0 bg-transparent" value={cpassword} onChange={(e) => setCPassword(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col sm={12} lg={12} className="mb-3 text-center">
                            <Button className="Main-btn rounded-0 fw-bold px-5 mx-2" onClick={updatePassword}>Update Password</Button>
                            <Button className="Main-btn rounded-0 fw-bold px-5 mx-2" onClick={handleClose}>Cancel</Button>
                        </Col>
                    </MainCard>
                </Modal.Body>
            </Modal>
        </div >
    )
}