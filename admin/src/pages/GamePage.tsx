import { Col, Container, Row } from "react-bootstrap";
import { NavbarComponent } from "../components/navbarComponent";
import MainCard from "../components/card";
import { GameTable } from "../components/table";

function GamePage() {

    return (
        <div className="GamePage">
            <NavbarComponent />
            <Container>
                <Row>
                    <Col xs={12}>
                        <MainCard title="Game Lists">
                            <GameTable/>
                        </MainCard>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default GamePage;