import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component"
import { TransactionListItemProps } from "../pages/HomePage";
import { GameItemProps, RankingItemProps, RewardItemProps, UserItemProps } from "../utils/interface";
import { Button, ButtonGroup, Col, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import axios from "axios";
import MainCard from "./card";
import ReactFlagsSelect from "react-flags-select";
import { toast } from "react-toastify";

interface DataProps {
    data: UserItemProps[]
}

interface RankingDataProps {
    data: RankingItemProps[];
}

interface RewardDataProps {
    data: RewardItemProps[];
}




export const UsersTable: React.FC = () => {

    const [telegramId, setTelegramId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [status, setStatus] = useState(true);
    const [walletAddress, setWalletList] = useState("");
    const [country, setCountry] = useState("");
    const [show, setShow] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState<UserItemProps[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let token = window.localStorage.getItem('token');

    const headers = {
        authorization: `${token}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    }

    const columns: TableColumn<UserItemProps>[] = [
        {
            name: 'No',
            selector: (row, index) => (index ?? -1) + 1,
            width: windowWidth >= 768 ? "7%" : ""
        },
        {
            name: 'telegramId',
            cell: row => row.telegramId
        },
        {
            name: 'First Name',
            selector: row => row.first_name
        },
        {
            name: 'Last Name',
            selector: row => row.last_name
        },
        {
            name: 'UserName',
            selector: row => "@" + row.user_name
        },
        {
            name: 'WalletAddress',
            cell: row => row.walletAddress && (row.walletAddress)?.slice(0, 4) + "..." + (row.walletAddress)?.slice(-4)
        },
        {
            name: 'Country',
            cell: row => <Image src={`https://flaglog.com/codes/standardized-rectangle-120px/${row.country}.png`} height={25} />
        },
        {
            name: 'Status',
            cell: row => row.status === true ? <span>🟢</span> : <span>🔴</span>,
            width: windowWidth >= 768 ? "10%" : ""
        },
        {
            name: 'Action',
            cell: row => <Button className="Main-btn rounded-0 py-0 px-2" onClick={() => { getUserInfo(row.id) }}>Edit</Button>
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '32px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057'
            }
        },
        headRow: {
            style: {
                background: '#0D1521',
                color: 'white',
                border: '1px solid #495057',
                fontSize: '16px'
            },
        },
        pagination: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057',
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '30px',
                width: '30px',
                padding: '3px',
                margin: '2px',
                cursor: 'pointer',
                transition: '0.4s',
                color: 'white',
                filter: 'invert(1)'
            },
        },
        cells: {
            style: {
                width: '100%',
            },
        },
    };

    const getUserList = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/getAllUsers`, { headers });
            console.log(response.data.users);
            setUserData(response.data.users);
        } catch (error) {
            console.error("error", error);
        }
    };

    useEffect(() => {
        getUserList();
    }, []);
    useEffect(() => {
        getUserList();
    }, [show]);

    const getUserInfo = async (userId: number) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/admin/getUserInfo/${userId}`, { headers })
            .then(function (response) {
                setTelegramId(response.data.user.telegramId);
                setFirstName(response.data.user.first_name);
                setLastName(response.data.user.last_name);
                setUserName(response.data.user.user_name);
                setStatus(response.data.user.status);
                setWalletList(response.data.user.walletAddress);
                setCountry(response.data.user.country);
                setUserId(response.data.user.id);
                handleShow()
            })
            .catch(function (error) {

            })
    }

    const updateProfile = async () => {
        const body = {
            userId: userId,
            first_name: firstName,
            last_name: lastName,
            user_name: userName,
            status: status,
            walletAddress: walletAddress,
            country: country
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/updateUser`, body, { headers })
            .then(function (response) {
                toast.success(response.data.message);
                handleClose();
            })
            .catch(function (error) {
                toast.success(error.data.message);
            })
    }

    return (
        <div className="TransactionTable">
            <DataTable
                columns={columns}
                data={userData}
                pagination
                customStyles={customStyles}
            />
            <Modal show={show} onHide={handleClose} centered data-bs-theme="dark" size="lg">
                <Modal.Body className="p-0">
                    <MainCard title="Update Password">
                        <Row>
                            <Col xs={12} md={6} lg={4} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>TelegramId</Form.Label>
                                    <Form.Control readOnly className="rounded-0 bg-transparent" value={telegramId} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control className="rounded-0 bg-transparent" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control className="rounded-0 bg-transparent" value={lastName} onChange={(e) => { setLastName(e.target.value) }} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control readOnly className="rounded-0 bg-transparent" value={userName} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Wallet Address</Form.Label>
                                    <Form.Control readOnly className="rounded-0 bg-transparent" value={walletAddress} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Country</Form.Label>
                                    <ReactFlagsSelect
                                        selected={country}
                                        onSelect={(code: string) => setCountry(code)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Status</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" className="w-100 d-flex align-items-center justify-content-between rounded-0 bg-transparent">
                                            {status === true ? "🟢 Active" : "🔴 Disable"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="w-100 rounded-0">
                                            <Dropdown.Item onClick={() => { setStatus(true) }}>🟢 Active</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { setStatus(false) }}>🔴 Disable</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className="mb-3 text-center">
                                <Button className="Main-btn rounded-0 fw-bold px-5 mx-2" onClick={updateProfile}>Update Profile</Button>
                                <Button className="Main-btn rounded-0 fw-bold px-5 mx-2" onClick={handleClose}>Cancel</Button>
                            </Col>
                        </Row>
                    </MainCard>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export const RankingTable: React.FC<RankingDataProps> = (data) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedUser, setSelectedUser] = useState([]);
    const [show, setShow] = useState<boolean>(false);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("0");

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let token = window.localStorage.getItem('token');

    const headers = {
        authorization: `${token}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    }

    const columns: TableColumn<RankingItemProps>[] = [
        {
            name: 'No',
            selector: (row, index) => (index ?? -1) + 1,
            width: windowWidth >= 768 ? "7%" : ""
        },
        {
            name: 'User Name',
            cell: row => "@" + row.User.user_name
        },
        {
            name: 'First Name',
            selector: row => row.User.first_name
        },
        {
            name: 'Last Name',
            selector: row => row.User.last_name
        },
        {
            name: 'Country',
            cell: row => <Image src={`https://flaglog.com/codes/standardized-rectangle-120px/${row.User.country}.png`} height={25} />
        },
        {
            name: 'Score',
            cell: row => row.maxScore,
            width: windowWidth >= 768 ? "10%" : ""
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '32px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057'
            }
        },
        headRow: {
            style: {
                background: '#0D1521',
                color: 'white',
                border: '1px solid #495057',
                fontSize: '16px'
            },
        },
        pagination: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057',
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '30px',
                width: '30px',
                padding: '3px',
                margin: '2px',
                cursor: 'pointer',
                transition: '0.4s',
                color: 'white',
                filter: 'invert(1)'
            },
        },
        cells: {
            style: {
                width: '100%',
            },
        },
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = ({ selectedRows }: { selectedRows: any }) => {
        const userIds = selectedRows.map((item: any) => item.User.id);
        console.log('Selected Rows: ', userIds);

        setSelectedUser(userIds)
    };

    const provideReward = async () => {
        const body = {
            userIds: selectedUser,
            title: title,
            amount: amount
        }

        console.log("body-----", body)

        await axios.post(`${process.env.REACT_APP_API_URL}/admin/rewards/provideReward`, body, { headers })
            .then(function (response) {
                toast.success(response.data.message);
                handleClose();
            })
            .catch(function (error) {
            })

    }



    return (
        <div className="TransactionTable">
            {selectedUser.length > 0 && (
                <Row>
                    <Col xs={12} className="text-end mb-3">
                        <Button className="Main-btn rounded-0" onClick={handleShow}>Reward</Button>
                    </Col>
                </Row>
            )}
            <DataTable
                columns={columns}
                data={data.data}
                pagination
                selectableRows
                customStyles={customStyles}
                onSelectedRowsChange={handleChange}
            />
            <Modal show={show} onHide={handleClose} centered data-bs-theme="dark" >
                <Modal.Body className="p-0">
                    <MainCard title="Reward Provider">
                        <Row>
                            <Col xs={12} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Reward Title</Form.Label>
                                    <Form.Control className="rounded-0 bg-transparent" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Reward Amount</Form.Label>
                                    <Form.Control type="number" className="rounded-0 bg-transparent" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} className="mb-3 text-center">
                                <Button className="Main-btn rounded-0 fw-bold px-5 w-100" onClick={provideReward}>Reward</Button>
                            </Col>
                            <Col xs={12} sm={6} className="mb-3 text-center">
                                <Button className="Main-btn rounded-0 fw-bold px-5 w-100" onClick={handleClose}>Cancel</Button>
                            </Col>
                        </Row>
                    </MainCard>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export const GameTable: React.FC = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [gameData, setGameData] = useState<GameItemProps[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [status, setStatus] = useState<boolean>(true);
    const [gameId, setGameId] = useState<number>(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getGameData = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/admin/games/getGameList`)
            .then(function (response) {
                console.log(response.data)
                setGameData(response.data.games)
            })
            .catch(function (error) {
                console.log("error", error)
            })
    }


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        getGameData();
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let token = window.localStorage.getItem('token');

    const headers = {
        authorization: `${token}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    }

    const openModal = async ({ type, id }: { type: string, id?: number }) => {
        if (type === "create") {
            setName("");
            setDescription("");
            setImage("");
            setStatus(true);
            setGameId(0);
            handleShow();
        }
        else {
            await axios.get(`${process.env.REACT_APP_API_URL}/admin/games/getGameInfo/${id}`, { headers })
                .then(function (response) {
                    setName(response.data.game.name);
                    setDescription(response.data.game.description);
                    setImage(response.data.game.image);
                    setStatus(response.data.game.status);
                    setGameId(response.data.game.id);
                })
                .catch(function (error) {

                });
            handleShow();
        }
    }

    const columns: TableColumn<GameItemProps>[] = [
        {
            name: 'No',
            selector: (row, index) => (index ?? -1) + 1,
            width: windowWidth >= 768 ? "7%" : ""
        },
        {
            name: 'telegramId',
            cell: row => row.name
        },
        {
            name: 'First Name',
            selector: row => row.description
        },
        {
            name: 'Status',
            cell: row => row.status === true ? <span>🟢</span> : <span>🔴</span>,
            width: windowWidth >= 768 ? "10%" : ""
        },
        {
            name: 'Action',
            cell: row => <Button className="Main-btn rounded-0 py-0 px-2" onClick={() => { openModal({ type: "edit", id: row.id }) }}>Edit</Button>
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '32px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057'
            }
        },
        headRow: {
            style: {
                background: '#0D1521',
                color: 'white',
                border: '1px solid #495057',
                fontSize: '16px'
            },
        },
        pagination: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057',
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '30px',
                width: '30px',
                padding: '3px',
                margin: '2px',
                cursor: 'pointer',
                transition: '0.4s',
                color: 'white',
                filter: 'invert(1)'
            },
        },
        cells: {
            style: {
                width: '100%',
            },
        },
    };



    const submitInfo = async () => {
        const body = {
            gameId: gameId,
            name: name,
            description: description,
            image: image,
            status: status
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/games/${gameId === 0 ? "createGame" : "updateGame"}`, body, { headers })
            .then(function (response) {
                toast.success(response.data.message);
                setGameData(response.data.games);
                handleClose();
            })
            .catch(function (error) {

            });
    }

    useEffect(() => {
        getGameData();
    }, [show]);

    return (
        <div className="TransactionTable">
            <Row>
                <Col xs={12} className="mb-3 text-end"><Button className="Main-btn rounded-0" onClick={() => { openModal({ type: "create" }) }}>Create Game</Button></Col>
                <Col xs={12}>
                    <DataTable
                        columns={columns}
                        data={gameData}
                        pagination
                        customStyles={customStyles}
                    />
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} centered data-bs-theme="dark" size="lg">
                <Modal.Body className="p-0">
                    <MainCard title="Update Password">
                        <Row>
                            <Col xs={12} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Game Title</Form.Label>
                                    <Form.Control className="rounded-0 bg-transparent" value={name} onChange={(e) => { setName(e.target.value) }} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={4} className="rounded-0 bg-transparent" value={description} onChange={(e) => { setDescription(e.target.value) }} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={8} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control as="input" type="file" className="rounded-0 bg-transparent" value={image} onChange={(e) => { setImage(e.target.value) }} required />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4} className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Status</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" className="w-100 d-flex align-items-center justify-content-between rounded-0 bg-transparent">
                                            {status === true ? "🟢 Active" : "🔴 Disable"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="w-100 rounded-0">
                                            <Dropdown.Item onClick={() => { setStatus(true) }}>🟢 Active</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { setStatus(false) }}>🔴 Disable</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className="mb-3 text-center">
                                <Button className="Main-btn rounded-0 fw-bold px-5 mx-2" onClick={submitInfo}>Save</Button>
                                <Button className="Main-btn rounded-0 fw-bold px-5 mx-2" onClick={handleClose}>Cancel</Button>
                            </Col>
                        </Row>
                    </MainCard>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export const RewardTable: React.FC<RewardDataProps> = (data) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let token = window.localStorage.getItem('token');

    const headers = {
        authorization: `${token}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    }

    const formattedDateStr = (date: string) => {
        const dateObj = new Date(date);

        // Function to pad single digits with leading zero
        const padZero = (num: any) => (num < 10 ? '0' : '') + num;

        // Extract components
        const month = padZero(dateObj.getMonth() + 1); // Months are zero-based
        const day = padZero(dateObj.getDate());
        const year = String(dateObj.getFullYear()); // Last two digits of the year
        const hours = padZero(dateObj.getHours());
        const minutes = padZero(dateObj.getMinutes());
        const seconds = padZero(dateObj.getSeconds());

        // Construct the formatted string
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const columns: TableColumn<RewardItemProps>[] = [
        {
            name: 'No',
            selector: (row, index) => (index ?? -1) + 1,
            width: windowWidth >= 768 ? "7%" : ""
        },
        {
            name: 'User Name',
            cell: row => "@" + row.User.user_name
        },
        {
            name: 'First Name',
            selector: row => row.User.first_name
        },
        {
            name: 'Last Name',
            selector: row => row.User.last_name
        },
        {
            name: 'Country',
            cell: row => <Image src={`https://flaglog.com/codes/standardized-rectangle-120px/${row.User.country}.png`} height={25} />
        },
        {
            name: 'Amount',
            cell: row => row.amount,
            width: windowWidth >= 768 ? "10%" : ""
        },
        {
            name: 'Date',
            cell: row => formattedDateStr(row.createdAt),
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '32px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057'
            }
        },
        headRow: {
            style: {
                background: '#0D1521',
                color: 'white',
                border: '1px solid #495057',
                fontSize: '16px'
            },
        },
        pagination: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057',
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '30px',
                width: '30px',
                padding: '3px',
                margin: '2px',
                cursor: 'pointer',
                transition: '0.4s',
                color: 'white',
                filter: 'invert(1)'
            },
        },
        cells: {
            style: {
                width: '100%',
            },
        },
    };

    return (
        <div className="TransactionTable">
            <DataTable
                columns={columns}
                data={data.data}
                pagination
                customStyles={customStyles}
            />
        </div>
    )
}