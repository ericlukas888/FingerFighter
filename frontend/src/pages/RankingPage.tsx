import { useEffect, useState } from "react";
import { Card, Col, Container, Dropdown, Row, Image } from "react-bootstrap";
import { Avatar1, Avatar2 } from "../assets";
import { FaShoePrints } from "react-icons/fa6";
import axios from "axios";
import { useMainContext } from "../context/MainContext";

function RankingPage() {
    const {user} = useMainContext();
    const [selectGame, setSelectGame] = useState(1);
    const [selectTime, setSelectTime] = useState<"day" | "week" | "month">("day");
    const [rankingData, setRankingData] = useState<any | null>(null);
    const [myRanking, setMyRanking] = useState<any>({});

    const getRanking = async () => {

        await axios.get(`${process.env.REACT_APP_API_URL}/gamehistory/ranking/${selectGame}/${selectTime}`)
        .then(function (response) {
            console.log(response.data)
            setRankingData(response.data.ranking);
            getMyRanking(response.data.ranking)
          })
          .catch(function (error) {
            console.log("error", error)
          })
    }

    const getMyRanking = (data:any) => {
        const searchValue = user.user_name;

        const index = data.findIndex((item:any) => item.User.user_name === searchValue);
        const itemData = data[index];
        const _myRanking = {
            rank: index,
            score: itemData.maxScore,
            country: itemData.User.country
        }

        setMyRanking(_myRanking);
        console.log("index", itemData)
    }

    const formattedDateStr = (date: string) => {
        const dateObj = new Date(date);

        // Function to pad single digits with leading zero
        const padZero = (num: any) => (num < 10 ? '0' : '') + num;
        
        // Extract components
        const month = padZero(dateObj.getMonth() + 1); // Months are zero-based
        const day = padZero(dateObj.getDate());
        const year = String(dateObj.getFullYear()).slice(-2); // Last two digits of the year
        const hours = padZero(dateObj.getHours());
        const minutes = padZero(dateObj.getMinutes());
        const seconds = padZero(dateObj.getSeconds());
        
        // Construct the formatted string
        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        getRanking()
    }, []);

    useEffect(() => {
        getRanking()
    }, [selectGame, selectTime]);

    return (
        <div className="RankingPage pb-5">
            <Container className="pb-5 pt-3">
                <h4 className="text-center text-uppercase">Ranking</h4>
                <hr />
                <Row>
                    <Col xs={6} className="mb-3">
                        <Dropdown className="w-100">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100 main-button d-flex align-items-center justify-content-between">
                                Select Game
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="w-100">
                                <Dropdown.Item href="#/action-1" className="text-white">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" className="text-white">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3" className="text-white">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={6} className="mb-3">
                        <Dropdown className="w-100">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100 main-button d-flex align-items-center justify-content-between">
                                Select Time
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="w-100">
                                <Dropdown.Item className="text-white" onClick={() => {setSelectTime("day")}}>Daily</Dropdown.Item>
                                <Dropdown.Item className="text-white" onClick={() => {setSelectTime("week")}}>Weekly</Dropdown.Item>
                                <Dropdown.Item className="text-white" onClick={() => {setSelectTime("month")}}>Monthly</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="">
                        <Card className="reward-card">
                            <Card.Body>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <Image src={Avatar1} width={75} height={75} className="me-3 border rounded-circle bg-white" />
                                        <div>
                                            <div className="fs-3 text-uppercase fw-bold mb-2">@{user?.user_name}</div>
                                            <div className="d-flex align-items-center"><Image  src={`https://flaglog.com/codes/standardized-rectangle-120px/${myRanking?.country}.png`} width={20} className="me-2" /><FaShoePrints className="me-2" /> <span>{myRanking?.score}</span></div>
                                        </div>
                                    </div>
                                    <h1>No.{myRanking?.rank + 1}</h1>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <hr />
                <Row>
                    {
                        rankingData?.map((item:any, index:number) => (
                            <Col xs={12} className="mb-3">
                                <Card className="reward-card">
                                    <Card.Body className="py-2">
                                        <Row className="align-items-center">
                                            <Col xs={2} className="border-end fw-bold fs-5">{index + 1}</Col>
                                            <Col xs={7}>
                                                <div className="d-flex align-items-center">
                                                    <Image src={Avatar2} width={40} height={40} className="me-3 border rounded-circle bg-white" />
                                                    <div className="d-flex flex-column justify-content-between">
                                                        <div className="fw-bold">{item.User.first_name} {item.User.last_name}</div>
                                                        <div className="">
                                                            <Image  src={`https://flaglog.com/codes/standardized-rectangle-120px/${item.User.country}.png`} width={20} className="me-1" />
                                                            <small>{formattedDateStr(item.updatedAt)}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div className="d-flex align-items-center justify-content-end"><FaShoePrints className="me-2" /> <span>{item.maxScore}</span></div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </div>
    );
}

export default RankingPage;
