import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmLayer from "../lists/ConfirmLayer";


function DeleteTask({ goBack = null, flipData = null }) {
    const navigate = useNavigate();
    const deleteTask = async () => {
        goBack && goBack();
        goBack && goBack();
        await flipData("deleted");
        toast.success("Task has been deleted");
    };
    return (
        <ConfirmLayer
            maxWidth={200}
            title="Delete this lask?"
            button="Delete"
            label="This tasks will be permanently deleted"
            onOuterClick={() => navigate(-1)}
            onConfirm={deleteTask}
        />
    );
};

export default DeleteTask;