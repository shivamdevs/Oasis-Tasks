import { Route, Routes } from "react-router-dom";
import Accounts from "../Accounts/Accounts";
import { setTitle } from "../../app.functions";
import HomeLayout from "../layouts/HomeLayout";
import Notfound from "../layouts/Notfound";
import WelcomeAlign from "./WelcomeAlign";


function Desktop() {
    setTitle("Loading");
    return (
        <Routes>
            <Route path="/lists/*" element={<HomeLayout mode={true} />} />
            <Route path="/accounts/*" element={<Accounts />} />
            <Route path="/" exact element={<WelcomeAlign />} />
            <Route path="*" element={<Notfound />} />
        </Routes>
    );
}

export default Desktop;