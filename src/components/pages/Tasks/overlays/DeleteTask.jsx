import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ConfirmLayout } from "../../../layouts/Layout";
import { LoadCircle } from "../../../layouts/Loading";


function DeleteTask({goBack = null, deleting = false, setDeleting = null, flipData = null}) {
    const navigate = useNavigate();
    const deleteTask = async () => {
        setDeleting(true);
        goBack && goBack();
        flipData && await flipData("deleted");
        goBack && goBack();
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
            {deleting && <LoadCircle />}
        </>
    );
};

export default DeleteTask;