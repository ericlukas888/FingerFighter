import { Col, Container, Row } from "react-bootstrap";
import { NavbarComponent } from "../components/navbarComponent";
import MainCard from "../components/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { RewardItemProps } from "../utils/interface";
import { RewardTable } from "../components/table";

export default function RewardPage() {
    const [rewardData, setRewardData] = useState<RewardItemProps[]>([]);

    const getRewards = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/admin/rewards/getUsersReward`)
        .then(function (response) {
            console.log(response.data)
            setRewardData(response.data.rewards)
          })
          .catch(function (error) {
            console.log("error", error)
          })
    }

    useEffect(() => {
        getRewards();
    }, []);

    return(
        <div className="RewardPage">
            <NavbarComponent />
            <Container>
                <Row>
                    <Col xs={12}>
                        <MainCard title="Reward History">
                            <RewardTable data={rewardData}/>
                        </MainCard>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}