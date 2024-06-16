import { Card, Image } from "react-bootstrap"
import CoinIcon from '../assets/images/icons/coin.svg';

export const MainInformationCard = ({title, value, color}:{title:string, value:string, color:string}) => {
    return (
        <Card className="rounded-4 info-card text-center py-1">
            <div className="fw-semibold" style={{color: color}}>{title}</div>
            <div className="d-flex align-items-center justify-content-center">
                <Image src={CoinIcon} height={30} width={30} className="" alt="icon" />
                <span className="fw-bold text-white fw-bold">{value}</span>
            </div>
        </Card>
    )
}