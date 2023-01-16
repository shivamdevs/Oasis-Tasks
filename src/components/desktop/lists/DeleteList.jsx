import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { escapePage, setTitle } from "../../../app.functions";
import { updateList } from "../../../fb.todo";
import ConfirmLayer from "./ConfirmLayer";

function DeleteList({ currentList = {}, publish = null }) {
    const navigate = useNavigate();
    setTitle("Delete list", currentList.label);
    escapePage(() => navigate(-1));
    const deleteList = async () => {
        navigate(-1);
        const update = await updateList(currentList.key, "deleted", true);
        if (update.type !== "success") {
            return toast.error(update.data);
        }
        await publish();
        toast.success("List deleted");
    };
    return (
        <ConfirmLayer
            maxWidth={200}
            title="Delete this list?"
            button="Delete"
            label="All tasks in this list will be permanently deleted"
            onOuterClick={() => navigate(-1)}
            onConfirm={deleteList}
        />
    );
}

export default DeleteList;