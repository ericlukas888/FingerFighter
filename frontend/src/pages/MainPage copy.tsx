import { Card, CardBody, Col, Container, Image, ProgressBar, Row } from "react-bootstrap";
import AvatarImage from '../assets/images/avatars/1.png';
import CoinIcon from '../assets/images/icons/coin.svg';
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { MainInformationCard } from "../components/Cards";
import { Rocket } from "../components/rocket";
import EnergyIcon from '../assets/images/icons/energy.svg';
import { RaceGame } from "../components/race";
import { FaRoad, FaBoltLightning, FaClock } from "react-icons/fa6";
import { useEffect } from "react";
import axios from 'axios';

function MainPage() {

  useEffect(() => {

  }, []);

  return (
    <div className="MainPage">
      <Container className="mb-5 mt-3">
        <Row className="mb-3">
          <Col xs={6} className="text-start">
            <div className="d-flex flex-row align-items-center">
              <Image src={AvatarImage} height={30} width={30} className="rounded-5 border me-2" alt="avatar" />
              <span>Eric Lukas</span>
            </div>
          </Col>
          <Col xs={6} className="text-end">Binance</Col>
        </Row>
        <hr />
        {/* <Row className="mb-3">
          <Col xs={4}>
            <MainInformationCard title="Earn per tap" value="+13" color="#F79841" />
          </Col>
          <Col xs={4}>
            <MainInformationCard title="Coins to level up" value="2M" color="#6F72E2" />
          </Col>
          <Col xs={4}>
            <MainInformationCard title="Profit per hour" value="+66.53K" color="#84CB69" />
          </Col>
        </Row> */}
        <Row className="mb-3">
          <Col xs={6} className="d-flex mb-1  flex-row align-items-center justify-content-start">
            {/* <Image src={CoinIcon} height={60} width={60} className="" alt="icon" /> */}
            <FaRoad className="fs-1 me-2" />
            <span className="fs-1 fw-bold">507,981</span>
          </Col>
          <Col xs={6} className="d-flex mb-1  flex-row align-items-center justify-content-end">
            {/* <Image src={CoinIcon} height={60} width={60} className="" alt="icon" /> */}
            <FaBoltLightning className="fs-1 me-2" />
            <span className="fs-1 fw-bold">507,981</span>
          </Col>
          <Col xs={12}>
            <NavLink to="/level" className="nav-link">
              <div className="d-flex align-items-center justify-content-between mb-2 level-section">
                <div className="d-flex align-items-center level-section-title text-white fw-bold"><span>Diamond</span><FaChevronRight /></div>
                <div><span>Level: </span><span className="level-section-rate text-white fw-bold">5/10</span></div>
              </div>
              <ProgressBar now={60} className="rounded-5" />
            </NavLink>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            {/* <Rocket /> */}
            <RaceGame />
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="mx-auto">
            <div className="energy-section p-2 d-flex align-items-center rounded-5 justify-content-center">
              {/* <Image src={EnergyIcon} height={30} width={30} className="me-2" alt="avatar" /> */}
              <FaClock className="me-2" />
              <span className="fs-5 fw-bold">3000/3000</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;
