// import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from './fb.user';
import { useAuthState } from "react-firebase-hooks/auth";

import './styles/override.css';

import Loading from "./components/layouts/Loading";
import About from "./components/pages/About";
import Notfound from "./components/layouts/Notfound";
import Welcome from "./components/pages/Welcome";
// import AuthLayout from "./components/layouts/AuthLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import Accounts from "./components/Accounts/Accounts";

function App() {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (error) console.error(error);
    }, [error, loading, navigate, user]);

    return (
        <>
            {loading && <Loading />}
            {!loading && <>
                <Routes>
                    <Route path="/lists/*" element={<HomeLayout />} />
                    <Route path="/accounts/*" element={<Accounts />} />
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