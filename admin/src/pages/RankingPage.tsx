import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { NavbarComponent } from "../components/navbarComponent";
import MainCard from "../components/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { RankingItemProps } from "../utils/interface";
import { RankingTable } from "../components/table";

export default function RankingPage() {

    const [selectGame, setSelectGame] = useState(1);
    const [selectTime, setSelectTime] = useState<"day" | "week" | "month">("day");
    const [rankingData, setRankingData] = useState<RankingItemProps[]>([]);

    const getRankings = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/admin/ranking/${selectGame}/${selectTime}`)
        .then(function (response) {
            console.log(response.data)
            setRankingData(response.data.ranking)
          })
          .catch(function (error) {
            console.log("error", error)
          })
    }

    useEffect(() => {
        getRankings();
    }, []);
    useEffect(() => {
        getRankings();
    }, [selectTime, selectGame]);

    return (
        <div className="RankingPage">
            <NavbarComponent />
            <Container>
                <Row>
                    <Col xs={12} className="mb-3">
                        <MainCard title="Ranking Table">
                            <Row>
                                <Col xs={6} sm={6} className="mb-3">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100 d-flex align-items-center justify-content-between Main-btn rounded-0">
                                            {selectGame === 1 ? "Finger Tap Race" : "Select Game"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="w-100">
                                            <Dropdown.Item onClick={() => {setSelectGame(1)}}>Finger Tap Race</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col xs={6} sm={6} className="mb-3">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100 d-flex align-items-center justify-content-between Main-btn rounded-0">
                                            {selectTime}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="w-100">
                                            <Dropdown.Item onClick={() => {setSelectTime("day")}}>Day</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {setSelectTime("week")}}>Week</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {setSelectTime("month")}}>Month</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <RankingTable data={rankingData}/>
                                </Col>
                            </Row>
                        </MainCard>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}