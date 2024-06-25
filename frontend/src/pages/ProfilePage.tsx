import { TonConnectButton, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { toast } from "react-toastify";
import { useMainContext } from "../context/MainContext";

function ProfilePage() {
    const [selected, setSelected] = useState("");
    const { setUserInfo, user } = useMainContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const wallet = useTonAddress();
    console.log("wallet", wallet)

    const getUserInfo = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/users/getUser/${user?.telegramId}`)
            .then(function (response) {
                console.log(response.data)
                setUserInfo(response.data.user)
                setFirstName(response.data.user.first_name);
                setLastName(response.data.user.last_name);
                setUserName(response.data.user.user_name);
                setSelected(response.data.user.country);;
            })
            .catch(function (error) {
                console.error("error", error);
            })
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    const updateProfile = async () => {
        if(!wallet) {
            return toast.error("Please connect your wallet before updating your profile.")
        }

        const body = {
            telegramId: user.telegramId,
            firstName: firstName,
            lastName: lastName,
            country: selected,
            walletAddress: wallet
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/users/updateProfile`, body)
        .then(function (response) {
            console.log(response.data)
            toast.success(response.data.message);
            setUserInfo(response.data.user)
          })
          .catch(function (error) {
            console.error("error", error)
          })
    }
    return (
        <div className="ProfilePage">
            <Container className="mb-5 pt-3">
                <h4 className="text-center text-uppercase">Profile</h4>
                <hr />
                <Row>
                    <Col xs={6} className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={(e) => {setFirstName(e.target.value)}} value={firstName} className="bg-transparent text-white" />
                    </Col>
                    <Col xs={6} className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={(e) => {setLastName(e.target.value)}} value={lastName} className="bg-transparent text-white" />
                    </Col>
                    <Col xs={12} className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control value={userName} className="bg-transparent text-white" readOnly />
                    </Col>
                    <Col xs={12} className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <ReactFlagsSelect
                            selected={selected}
                            onSelect={(code: string) => setSelected(code)}
                        />
                    </Col>
                </Row>
                <TonConnectButton style={{ width: "100%" }} />

            </Container>
        </div>
    );
}

export default ProfilePage;
