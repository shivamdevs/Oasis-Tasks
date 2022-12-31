import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateList } from "../../../../fb.todo";
import { DeleteLayout } from "../../../Layout";

function DeleteList({ currentList = {}, publish = null }) {
    const navigate = useNavigate();
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
        <DeleteLayout
            title="Delete this list?"
            label="All tasks in this list will be permanently deleted"
            onOuterClick={() => navigate(-1)}
            onDelete={deleteList}
        />
    );
}

export default DeleteList;