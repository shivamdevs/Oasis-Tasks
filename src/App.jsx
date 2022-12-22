import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import './styles/override.css';

import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import Welcome from "./components/pages/Welcome";
import Notfound from "./components/Notfound";
import About from "./components/pages/About";
import AuthLayout from "./components/AuthLayout";
import HomeLayout from "./components/HomeLayout";

function App() {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (!loading && !user) {

        }

        if (error) {
            console.log(error);
        }
    }, [error, loading, navigate, user]);

    return (
        <>
            <Toaster position="bottom-center" />
            <BrowserView>
                <Routes>
                    < Route path="*" element={<h1><center>View this app on mobile device.</center></h1>} />
                </Routes>
            </BrowserView>
            <MobileView>
                {loading && <Loading />}
                {!loading && <>
                    <Routes>
                        <Route path="/tasks/*" element={<HomeLayout />} />
                        <Route path="/auth/*" element={<AuthLayout />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/" exact element={<Welcome />} />
                        <Route path="*" element={<Notfound />} />
                    </Routes>
                </>}
            </MobileView>
        </>
    );
};

export default App;