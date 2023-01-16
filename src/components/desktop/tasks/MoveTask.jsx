import css from './../../../../styles/Home.module.css';
import classNames from "classnames";
import { TransLayout } from "../../../layouts/Layout";
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../../../../fb.todo';
import { toast } from 'react-hot-toast';


function MoveTask({categories = [], setUpdating = null, currentList = "default", currentTask = "", publish = null}) {
    const params = useParams();
    const navigate = useNavigate();
    const updateList = async (value) => {
        if (!value) return;
        navigate(-1);
        setUpdating(old => ++old);
        await updateTask(params.taskid, { list: value });
        publish && await publish();
        setUpdating(old => --old);
        toast.success("Task moved to another list");
    };
    return (
        <TransLayout className={css.todoShift} onOuterClick={() => navigate(-1)}>
            <div className={css.todoShiftHead}>Move task to</div>
            {categories.length && categories.map(list => {
                if (list.key === "starred") return ("");
                return (
                    <div key={list.key} onClick={() => updateList(list.key)} className={classNames(
                        css.todoShiftItem,
                        (currentList === list.key ? css.todoShiftItemActive : "")
                    )}>
                        <span>{list.label}</span>
                        {currentList === list.key && <i className="fas fa-check"></i>}
                    </div>
                );
            })}
        </TransLayout>
    );
};

export default MoveTask;