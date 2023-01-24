import { toast } from "react-hot-toast";
import { deleteAllDeleted } from "../../fb.admin";
import Layout from "../layouts/Layout";
import BackHeader from "../parts/BackHeader";


function Admin({admin}) {
    const deleteStart = async (e) => {
        e.target.style.display = "none";
        let x = toast.loading("Starting server...");
        const log = (m) => (x = toast.loading(m, { id: x }));
        const p = await deleteAllDeleted(log);
        if (p.type === "success") {
            toast.success("Wiping process completed.", { id: x });
        } else {
            toast.error("Failed to wipe data. Try again later.", {id: x});
        }
        e.target.style.display = "";
    };
    return (
        <Layout>
            <BackHeader label="Admin panel" />
            {admin && admin.level === 0 && <button className="button filled" onClick={deleteStart}>Wipe all finished data.</button>}
            {(!admin || admin.level > 0) && <span>You are not an admin or of high level to use this page.</span>}
        </Layout>
    );
};

export default Admin;