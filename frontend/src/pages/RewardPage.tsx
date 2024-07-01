import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { CalendarIcon, CoinIcon } from "../assets";
import { FaCircleCheck  } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/MainContext";



function RewardPage() {
    const [rewards, setRewards] = useState([]);
    const {user} = useMainContext();
    const getRanking = async () => {

        await axios.get(`${process.env.REACT_APP_API_URL}/rewards/getUserRewards/${user?.id}`)
        .then(function (response) {
            console.log(response.data)
            setRewards(response.data.rewards);
          })
          .catch(function (error) {
            console.log("error", error)
          })
    }
    
    useEffect(() => {
        getRanking();
    }, []);
    return (
        <div className="RewardPage pb-5">
            <Container className="pb-5 pt-3 mb-5">
            <h4 className="text-center text-uppercase">Rewards</h4>
            <hr />
            <Row>
                {rewards?.map((item : any, index: number) => (
                    <Col xs={12} className="mb-3">
                        <Card className="reward-card">
                            <Card.Body className="py-1">
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <Image src={CoinIcon} width={75} height={75} className="me-2"/>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h5>{item?.title}</h5>
                                            <div className="d-flex align-items-center"><Image src={CoinIcon} width={40} height={40} className=""/><strong>+{item.amount}</strong></div>
                                        </div>
                                    </div>
                                    <FaCircleCheck className="text-success fs-2 bg-white rounded-5"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Container>
        </div>
    );
}

export default RewardPage;
