import { Button, Card, CardBody, Col, Container, Image, Modal, ProgressBar, Row, Table } from "react-bootstrap";
import AvatarImage from '../assets/images/avatars/1.png';
import CoinIcon from '../assets/images/icons/coin.svg';
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { MainInformationCard } from "../components/Cards";
import { Rocket } from "../components/rocket";
import EnergyIcon from '../assets/images/icons/energy.svg';
import { RaceGame } from "../components/race";
import { FaRoad, FaBoltLightning, FaClock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from 'axios';
import EndlessRunnerGame from "./games/endless_runner";
import { useMainContext } from "../context/MainContext";
import ReactFlagsSelect from "react-flags-select";
import { CountryRanking } from "../utils/sampleData";

function MainPage() {

  const { countryModal, countryModalHandler } = useMainContext();
  const [selected, setSelected] = useState("");

  const selectCountry = () => {
    console.log("selected", selected)
    countryModalHandler();
  }

  return (
    <div className="MainPage">
      <Modal show={countryModal} animation={false} fullscreen>
        <Modal.Body>
          <h2 className="text-center">Welcome to</h2>
          <h2 className="text-center">Finger Fight Olympic Games</h2>
          <hr />
          <p className="text-justify">Choose your country and take part in a variety of finger-based challenges to earn points and lead your country to victory in the virtual Olympic competition.</p>
          <ReactFlagsSelect
            selected={selected}
            onSelect={(code: string) => setSelected(code)}
          />
          <hr />
          <h4 className="text-center text-uppercase">Country Ranking</h4>
          <Table className="country-ranking-table mb-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {CountryRanking.map((item, index) => (
                <tr>
                  <td className="bg-transparent text-center text-white">{index + 1}</td>
                  <td className="bg-transparent text-center text-white">{item.name}</td>
                  <td className="bg-transparent text-center text-white">{item.score}</td>
                  <td className="bg-transparent text-center text-white">
                    <Image src={`https://flaglog.com/codes/standardized-rectangle-120px/${item.country}.png`} width={30} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button className="w-100 fw-bold text-uppercase main-button" onClick={selectCountry}>Save Country</Button>
        </Modal.Body>
      </Modal>
      <Container className="mb-5 pt-3">
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

      </Container>
    </div>
  );
}

export default MainPage;
