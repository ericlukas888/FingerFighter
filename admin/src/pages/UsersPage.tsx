import { Navigate } from "react-router-dom";
import { useMainContext } from "../utils/context";
import { NavbarComponent } from "../components/navbarComponent";
import { Col, Container, Row, Table } from "react-bootstrap";
import MainCard from "../components/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserItemProps } from "../utils/interface";
import { UsersTable } from "../components/table";

export default function UsersPage() {
    const { isLogin, user, setUser } = useMainContext();
    const [userData, setUserData] = useState<UserItemProps[]>([]);
    let _user = window.localStorage.getItem('user');

    let token = window.localStorage.getItem('token');

    const headers = {
        authorization: `${token}`
    }    

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

    if (!user && _user === '') {
        return (
            <Navigate to="/" replace />
        )
    }


    return (
        <div className="UsersPage">
            <NavbarComponent/>
            <Container>
                <Row>
                    <Col xs={12} className="mb-3">
                        <MainCard title="Users Table">
                            <UsersTable data={userData}/>
                        </MainCard>
                    </Col>
                </Row>
            </Container>
        </div >
    );
    return(
        <></>
    )
}