// import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth, logout } from './fb.user';
import { useAuthState } from "react-firebase-hooks/auth";

import './styles/override.css';

import Loading from "./components/Loading";
import About from "./components/pages/About";
import Notfound from "./components/Notfound";
import Welcome from "./components/pages/Welcome";
import AuthLayout from "./components/AuthLayout";
import HomeLayout from "./components/HomeLayout";
import ProfileMenu from "./components/pages/Profile";
import { Redirect } from "./appdata";

function App() {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (error) console.log(error);
    }, [error, loading, navigate, user]);

    return (
        <>
            {loading && <Loading />}
            {!loading && <>
                <Routes>
                    <Route path="/lists/*" element={<HomeLayout />} />
                    <Route path="/auth/*" element={<AuthLayout />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/settings" element={<ProfileMenu />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" exact element={<Welcome />} />
                    <Route path="*" element={<Notfound />} />
                </Routes>
            </>}
            {/* <BrowserView>
                <Routes>
                    < Route path="*" element={<h1><center>View this app on mobile device.</center></h1>} />
                </Routes>
            </BrowserView>
            <MobileView>
                
            </MobileView> */}
        </>
    );
};

export default App;

function Logout() {
    logout();
    return (<Redirect to={-1} />);
}