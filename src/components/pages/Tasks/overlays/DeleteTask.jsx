import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ConfirmLayout } from "../../../layouts/Layout";


function DeleteTask({goBack = null, flipData = null}) {
    const navigate = useNavigate();
    const deleteTask = async () => {
        goBack && goBack();
        goBack && goBack();
        await flipData("deleted");
        toast.success("Task has been deleted");
    };
    return (
        <>
            <ConfirmLayout
                button="Delete"
                title="Delete this task?"
                label="This tasks will be permanently deleted"
                onOuterClick={() => navigate(-1)}
                onConfirm={deleteTask}
            />
        </>
    );
};

export default DeleteTask;