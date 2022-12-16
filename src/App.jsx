import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import Welcome from "./components/pages/Welcome";
import Notfound from "./components/Notfound";
import About from "./components/pages/About";
import AuthLauout from "./components/AuthLauout";

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
                    < Route path="*" element={<h1><center>View this app on mobile devices</center></h1>} />
                </Routes>
            </BrowserView>
            <MobileView>
                {loading && <Loading />}
                {!loading && <>
                    <Routes>
                        <Route path="/auth/*" element={<AuthLauout />} />
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