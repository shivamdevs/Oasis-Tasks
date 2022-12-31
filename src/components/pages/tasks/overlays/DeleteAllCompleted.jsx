import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../../../../fb.todo";
import { DeleteLayout } from "../../../Layout";

function DeleteAllCompleted({ currentList = {}, taskArray = {}, publish = null }) {
    const navigate = useNavigate();
    const deleteTasks = async () => {
        navigate(-1);
        for (const task of taskArray[currentList.key].completed) {
            const update = await updateTask(task.id, "deleted", true);
            if (update.type !== "success") {
                return toast.error(update.data);
            }
            publish();
        }
        toast.success("All completed tasks deleted");
    };
    return (
        <DeleteLayout
            title="Delete all completed tasks?"
            label="Completed tasks will be permanently deleted from this list unless they repeat"
            onOuterClick={() => navigate(-1)}
            onDelete={deleteTasks}
        />
    );
}

export default DeleteAllCompleted;