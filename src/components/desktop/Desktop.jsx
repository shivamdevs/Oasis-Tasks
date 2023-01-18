import { Route, Routes, useNavigate } from "react-router-dom";
import { setTitle } from "../../app.functions";
import HomeLayout from "../layouts/HomeLayout";
import Notfound from "../layouts/Notfound";
import WelcomeAlign from "./WelcomeAlign";
import Accounts from "myoasis-accounts";


function Desktop() {
    const navigate = useNavigate();
    setTitle("Loading");
    return (
        <Routes>
            <Route path="/lists/*" element={<HomeLayout mode={true} />} />
            <Route path="/accounts/*" element={<Accounts onUserChange={() => navigate(-1)} />} />
            <Route path="/" exact element={<WelcomeAlign />} />
            <Route path="*" element={<Notfound />} />
        </Routes>
    );
}

export default Desktop;