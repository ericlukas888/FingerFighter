import { Navigate } from "react-router-dom";
import { useMainContext } from "../utils/context";
import { NavbarComponent } from "../components/navbarComponent";
import { Col, Container, Row, Table } from "react-bootstrap";
import MainCard from "../components/card";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { UserItemProps } from "../utils/interface";
import { UsersTable } from "../components/table";

export default function UsersPage() {
    const { isLogin, user, setUser } = useMainContext();
    let _user = window.localStorage.getItem('user');

    if (!user && _user === '') {
        return (
            <Navigate to="/" replace />
        )
    }


    return (
        <div className="UsersPage">
            <NavbarComponent />
            <Container>
                <Row>
                    <Col xs={12} className="mb-3">
                        <MainCard title="Users Table">
                            <UsersTable />
                        </MainCard>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}