import { TonConnectButton, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row, Spinner } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { toast } from "react-toastify";
import { useMainContext } from "../context/MainContext";
import { w_Avatar1 } from "../assets";
import { FaPenToSquare } from "react-icons/fa6";

const pinataApiKey = 'a12ebd397a8205ca54b3';
const pinataSecretApiKey = '565cbfb83b0519ea96fa77bcc0d1cf28e7cbd1e1ca8d0162f41014ed3a0bc975';

function ProfilePage() {
    const [selected, setSelected] = useState("");
    const { setUserInfo, user } = useMainContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const wallet = useTonAddress();
    const wallet1 = useTonWallet();
    console.log("wallet", wallet, wallet1?.account.address)

    const getUserInfo = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/users/getUser/${user?.telegramId}`)
            .then(function (response) {
                console.log(response.data)
                setUserInfo(response.data.user)
                setFirstName(response.data.user.first_name);
                setLastName(response.data.user.last_name);
                setUserName(response.data.user.user_name);
                setSelected(response.data.user.country);;
                setImage(response.data.user.image);
            })
            .catch(function (error) {
                console.error("error", error);
            })
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    const updateProfile = async () => {
        if (!wallet) {
            return toast.error("Please connect your wallet before updating your profile.")
        }

        const body = {
            telegramId: user.telegramId,
            firstName: firstName,
            lastName: lastName,
            country: selected,
            walletAddress: wallet,
            image: image
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

    const uploadImageToIPFS = async (file: any) => {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

        // Prepare form data
        let data = new FormData();
        data.append('file', file);

        // Axios headers
        const headers = {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
            'Content-Type': 'multipart/form-data'
        };

        try {
            const response = await axios.post(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error('Error uploading file: ', error);
            return null;
        }
    };

    const onFileChange = (event: any) => {
        setIsLoading(true);
        onFileUpload(event.target.files[0]);
    };

    const onFileUpload = async (file: any) => {
        const result = await uploadImageToIPFS(file);
        setImage(result.IpfsHash)
        setIsLoading(false);
    };


    return (
        <div className="ProfilePage">
            <Container className="pb-5 pt-3">
                <h4 className="text-center text-uppercase">Profile</h4>
                <hr />
                <Row>
                    <Col xs={12} className="mb-3 text-center">
                        <div className="position-relative">
                            {isLoading && (
                                <Spinner animation="border" role="status" className="loading-spinner">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )}
                            <Image src={image === null ? w_Avatar1 : `https://maroon-defiant-badger-629.mypinata.cloud/ipfs/${image}`} width={150} height={150} className="rounded-circle main-button" />
                            <Form.Label htmlFor="imageUpload" className="upload-btn main-button"><FaPenToSquare className="fs-3" /></Form.Label>
                            <Form.Control type="file" onChange={onFileChange} id="imageUpload" className="bg-transparent text-white d-none" />
                        </div>
                    </Col>
                    <Col xs={6} className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={(e) => { setFirstName(e.target.value) }} value={firstName} className="bg-transparent text-white" />
                    </Col>
                    <Col xs={6} className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={(e) => { setLastName(e.target.value) }} value={lastName} className="bg-transparent text-white" />
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
                    <Col xs={12} className="mb-5">
                        <Form.Label>Wallet</Form.Label>
                        <TonConnectButton style={{ width: "100%" }} />
                    </Col>
                    <Col xs={12} className="mb-3">
                        <Button className="main-button w-100" onClick={updateProfile}>Update Profile</Button>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

export default ProfilePage;
