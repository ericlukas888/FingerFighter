import { TonConnectButton } from "@tonconnect/ui-react";
import { Container } from "react-bootstrap";

function WalletPage() {
    return (
        <div className="WalletPage">
            <Container className="mb-5 pt-3">
            <TonConnectButton style={{width: "100%"}}/>

            </Container>
        </div>
    );
}

export default WalletPage;
