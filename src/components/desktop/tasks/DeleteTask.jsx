import { toast } from "react-hot-toast";
import ConfirmLayer from "../lists/ConfirmLayer";


function DeleteTask({ goBack = null, flipData = null }) {
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
            onConfirm={deleteTask}
        />
    );
};

export default DeleteTask;