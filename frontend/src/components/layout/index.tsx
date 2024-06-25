import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import FooterMenu from "./FooterMenu";

function MainLayout() {
    return (
        <div className="MainLayout">
            {/* <Appbar/> */}
            <Outlet/>
            <FooterMenu/>
        </div>
    );
}

export default MainLayout;
