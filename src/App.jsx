// import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from './fb.user';
import { useAuthState } from "react-firebase-hooks/auth";

import './styles/override.css';

import Loading from "./components/Loading";
import About from "./components/pages/About";
import Notfound from "./components/Notfound";
import Welcome from "./components/pages/Welcome";
import AuthLayout from "./components/AuthLayout";
import HomeLayout from "./components/HomeLayout";
import { Redirect } from "./appdata";
import NewList from "./components/pages/NewList";

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
                    <Route path="/lists/:listid" element={<HomeLayout />} />
                    <Route path="/lists/newlist" element={<NewList />} />
                    <Route path="/lists" element={<Redirect to="/lists/default" />} />
                    <Route path="/auth/*" element={<AuthLayout />} />
                    <Route path="/about" element={<About />} />
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