import { Button, Col, Container, Dropdown, Navbar, Row } from "react-bootstrap";
import { FaArrowLeft, FaEllipsisVertical, FaArrowsRotate, FaRegFileLines    } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function Appbar() {
    return (
        <div className="Appbar bg-black py-1">
            <Container>
                <Row className="align-items-center">
                    <Col xs={3} className="text-start text-white">
                        <Button className="bg-black border-0 fs-5"><FaArrowLeft /></Button>
                    </Col>
                    <Col xs={6} className="text-center text-white text-nowrap mx-auto fs-5 fw-bold">Finger Fighter</Col>
                    <Col xs={3} className="text-end text-white">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-black border-0 fs-5">
                                <FaEllipsisVertical />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="">
                                <Dropdown.Item className="text-white d-flex align-items-center"><FaArrowsRotate /><span className="ms-2">Reload Page</span></Dropdown.Item>
                                <Dropdown.Item className="text-white d-flex align-items-center"><FaRegFileLines /><span className="ms-2">Terms of Use</span></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Appbar;
