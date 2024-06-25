import { TonConnectButton } from "@tonconnect/ui-react";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";

function ProfilePage() {
    const [selected, setSelected] = useState("");
    return (
        <div className="ProfilePage">
            <Container className="mb-5 pt-3">
                <h4 className="text-center text-uppercase">Profile</h4>
                <hr />
                <Row>
                    <Col xs={6} className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control />
                    </Col>
                    <Col xs={6} className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control />
                    </Col>
                    <Col xs={12} className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control />
                    </Col>
                    <Col xs={12} className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <ReactFlagsSelect
                            selected={selected}
                            onSelect={(code: string) => setSelected(code)}
                        />
                    </Col>
                    <Col xs={12} className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control />
                    </Col>
                    <Col xs={12} className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control />
                    </Col>
                </Row>
                <TonConnectButton style={{ width: "100%" }} />

            </Container>
        </div>
    );
}

export default ProfilePage;
