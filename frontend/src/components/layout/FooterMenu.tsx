import { Button, Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUsers, FaGamepad, FaWallet, FaSackDollar, FaBomb , FaRankingStar , FaPersonRunning   } from "react-icons/fa6";

function FooterMenu() {
    return (
        <div className="FooterMenu position-fixed bottom-0 w-100">
            <Container>
                <Card className="mb-3 border-0">
                    <CardBody>
                        <Row className="flex flex-nowrap">
                            <Col>
                                <NavLink to="/games" className="nav-link fs-3 d-flex align-items-center flex-column border border-1 p-1 rounded-2">
                                    <FaGamepad   />
                                    <span className="mt-1">Games</span>
                                </NavLink>
                            </Col>
                            <Col>
                                <NavLink to="/mine" className="nav-link fs-3 d-flex align-items-center flex-column border border-1 p-1 rounded-2">
                                    <FaBomb  />
                                    <span className="mt-1">Mine</span>
                                </NavLink>
                            </Col>
                            <Col>
                                <NavLink to="/friends" className="nav-link fs-3 d-flex align-items-center flex-column border border-1 p-1 rounded-2">
                                    <FaRankingStar  />
                                    <span className="mt-1">Ranking</span>
                                </NavLink>
                            </Col>
                            <Col>
                                <NavLink to="/earn" className="nav-link fs-3 d-flex align-items-center flex-column border border-1 p-1 rounded-2">
                                    <FaSackDollar  />
                                    <span className="mt-1">Rewards</span>
                                </NavLink>
                            </Col>
                            <Col>
                                <NavLink to="/wallet" className="nav-link fs-3 d-flex align-items-center flex-column border border-1 p-1 rounded-2">
                                    <FaWallet  />
                                    <span className="mt-1">Wallet</span>
                                </NavLink>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default FooterMenu;
