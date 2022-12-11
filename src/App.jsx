import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import Welcome from "./components/Welcome";

function App() {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const [loadingMessage, setLoadingMessage] = useState("Warming up...");

    useEffect(() => {
        setLoadingMessage("Connecting...");
        if (!loading && !user) {
            setLoadingMessage("Finalizing...");
            setTimeout(() => {
                navigate("/welcome");
            }, 700);
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
                {loading && <Loading current={loadingMessage} />}
                {!loading && <>
                    <Routes>
                        <Route path="/welcome" element={<Welcome />} />
                    </Routes>
                </>}
            </MobileView>
        </>
    );
};

export default App;