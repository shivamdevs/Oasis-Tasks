import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes } from "react-router-dom";
import Loading from "./Loading";

function App() {
    return (
        <>
            <BrowserView>
                <Routes>
                    < Route path="*" element={<h1><center>View this app on mobile devices</center></h1>} />
                </Routes>
            </BrowserView>
            <MobileView>
                <Loading />
            </MobileView>
        </>
    );
};

export default App;