import { Button, Card, CardBody, Col, Container, Image, Modal, ProgressBar, Row, Table } from "react-bootstrap";
import AvatarImage from '../assets/images/avatars/1.png';
import CoinIcon from '../assets/images/icons/coin.svg';
import { Link, NavLink } from "react-router-dom";
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
import { CountryRanking, GameDataList } from "../utils/sampleData";
import { toast } from "react-toastify";
import { w_Avatar1 } from "../assets";

function MainPage() {

  const { countryModal, countryModalHandler, user, setUserInfo } = useMainContext();
  const [selected, setSelected] = useState("");

  const selectCountry = async () => {
    const body = {
      telegramId: user.id,
      country: selected
    }
    console.log("body", body, `${process.env.REACT_APP_API_URL}/users/setCountry`);
    await axios.post(`${process.env.REACT_APP_API_URL}/users/setCountry`, body)
      .then(function (response) {
        console.log(response.data)
        toast.success(response.data.message);
        setUserInfo(response.data.user)
        countryModalHandler();
      })
      .catch(function (error) {
        console.error("error", error)
      })
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
      <Container className="pb-5 pt-3 mb-5">
        <Row className="mb-3">
          <Col xs={9} className="text-start">
            <div className="d-flex flex-row align-items-center">
              <Image src={(user?.image === null || user?.image === undefined) ? w_Avatar1 : `https://maroon-defiant-badger-629.mypinata.cloud/ipfs/${user?.image}`} height={30} width={30} className="rounded-5 border me-2" alt="avatar" />
              <span>{user?.first_name + " " + user?.last_name}</span>
            </div>
          </Col>
          <Col xs={3} className="text-end">
          <Image src={`https://flaglog.com/codes/standardized-rectangle-120px/${user?.country}.png`} width={30} />
          </Col>
        </Row>
        <hr />
        <h4 className="text-uppercase">Games</h4>
        <Row>
          {GameDataList.map((item, index) => (
            <Col xs={12} className="mb-3">
              <Link to={item.router} className="d-flex nav-link">
                <Image className="rounded-3 me-3" src={item.image} width={100} height={100} alt="Game" />
                <div>
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;
