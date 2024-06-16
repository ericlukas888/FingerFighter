import { Button, Card, Col, Container, Image, Modal, Row } from "react-bootstrap"
import TitleLogo from '../assets/images/title-logo.svg';
import GymBanner from '../assets/images/gym.png';
import OlympicLogo from '../assets/images/olympic.svg';

export const PreLoader = ({ isOpen }: { isOpen: boolean }) => {

    return (
        <Modal show={isOpen} centered fullscreen className="Preloader">
            <Modal.Body className="mt-5">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <Image src={TitleLogo} width="100%" alt="logo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="py-5">
                            <Image src={GymBanner} width="100%" alt="logo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} className="mx-auto">
                            <Image src={OlympicLogo} width="100%" alt="logo" />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}