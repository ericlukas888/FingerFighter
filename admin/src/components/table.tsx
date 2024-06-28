import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component"
import { TransactionListItemProps } from "../pages/HomePage";
import { RankingItemProps, UserItemProps } from "../utils/interface";
import { Button, ButtonGroup, Col, Form, Image, Modal, Row } from "react-bootstrap";
import axios from "axios";
import MainCard from "./card";
import ReactFlagsSelect from "react-flags-select";
import { toast } from "react-toastify";

export const WalletTable = () => {

    type DataRow = {
        no: number,
        address: string
    }
    const columns: TableColumn<DataRow>[] = [
        {
            name: 'No',
            selector: row => row.no
        },
        {
            name: 'Address',
            selector: row => row.address
        },
    ];

    const data = [
        {
            no: 1,
            address: 'HfpM...PASq'
        },
        {
            no: 2,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 3,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 4,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 5,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 6,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 7,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 8,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 9,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 10,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 11,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 12,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 13,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
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
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
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
        }
    };

    const paginationRowsPerPageOptions = {
        rowsPerPageText: '',
        rangeSeparatorText: 'de',
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todos',
        noRowsPerPage: true,
    }

    return (
        <div className="WalletTable">
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
                paginationPerPage={5}
                paginationComponentOptions={paginationRowsPerPageOptions}
            />
        </div>
    )
}



interface DataProps {
    data: UserItemProps[]
}

interface RankingDataProps {
    data: RankingItemProps[];
}




export const UsersTable: React.FC<DataProps> = (data) => {

    const [telegramId, setTelegramId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [status, setStatus] = useState("ture");
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
                setUserData(response.data.users);
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
                data={data.data}
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
                                    <Form.Select aria-label="Default select example" className="bg-transparent rounded-0" onChange={(e) => { setStatus(e.target.value) }}>
                                        <option value="ture">Active</option>
                                        <option value="false">Disable</option>
                                    </Form.Select>
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