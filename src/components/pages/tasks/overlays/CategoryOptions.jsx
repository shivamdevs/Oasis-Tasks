import classNames from "classnames";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../../../../fb.todo";
import { TransLayout } from "../../../Layout";
import css from './../../../../styles/Home.module.css';

function CategoryOptions({ currentList = {}, taskArray = {}, publish = null }) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState({ tasks: false, stars: false, rename: false, delete: false, completed: false });

    useEffect(() => {
        if (currentList.key === "starred" || currentList.key === "default") setDisabled(old => {
            old.rename = true;
            old.delete = true;
            return old;
        });
        if (taskArray[currentList.key].completed.length === 0) setDisabled(old => {
            old.completed = true;
            return old;
        });
        if (taskArray[currentList.key].length === 0) setDisabled(old => {
            old.tasks = true;
            return old;
        });
        if (taskArray.starred.length === 0 && taskArray.starred.completed.length === 0) setDisabled(old => {
            old.stars = true;
            return old;
        });
    }, [currentList.key, taskArray]);

    const actionStar = async () => {
        navigate(-1);
        for (const task of [...taskArray.starred, ...taskArray.starred.completed]) {
            const update = await updateTask(task.id, "starred", false);
            if (update.type !== "success") {
                return toast.error(update.data);
            }
            publish();
        }
        toast.success("All tasks removed from starred");
    };
    const actionMark = async () => {
        navigate(-1);
        for (const task of taskArray[currentList.key]) {
            const update = await updateTask(task.id, "checked", true);
            if (update.type !== "success") {
                return toast.error(update.data);
            }
            publish();
        }
        toast.success("All tasks marked as completed");
    };
    const actionUnmark = async () => {
        navigate(-1);
        for (const task of taskArray[currentList.key].completed) {
            const update = await updateTask(task.id, "checked", false);
            if (update.type !== "success") {
                return toast.error(update.data);
            }
            publish();
        }
        toast.success("All tasks marked as incomplete");
    };
    const actionRename = () => {
        navigate(`/lists/${currentList.key}/renamelist`, { replace: true });
    };
    const actionDelete = () => {
        navigate(`/lists/${currentList.key}/deletelist`, { replace: true });
    };
    const actionCompleted = () => {
        navigate(`/lists/${currentList.key}/deletecompleted`, { replace: true });
    };

    return (
        <TransLayout onOuterClick={() => navigate(-1)}>
            <div className={css.listOptionHeader}>{currentList.label}</div>
            {(currentList.key === "starred") && <>
                <div className={css.listOptionBreak}></div>
                <div onClick={() => !disabled.stars && actionStar()} className={classNames(
                    css.listOptionBar,
                    (disabled.stars ? css.listOptionDisabled : "")
                )}>
                    <span></span>
                    <span>Remove all tasks from Starred</span>
                </div>
            </>}
            <div className={css.listOptionBreak}></div>
            <div onClick={() => !disabled.tasks && actionMark()} className={classNames(
                css.listOptionBar,
                (disabled.tasks ? css.listOptionDisabled : "")
            )}>
                <span></span>
                <span>Mark all as completed</span>
            </div>
            <div onClick={() => !disabled.completed && actionUnmark()} className={classNames(
                css.listOptionBar,
                (disabled.completed ? css.listOptionDisabled : "")
            )}>
                <span></span>
                <span>Mark all as incomplete</span>
            </div>
            <div className={css.listOptionBreak}></div>
            <div onClick={() => !disabled.rename && actionRename()} className={classNames(
                css.listOptionBar,
                (disabled.rename ? css.listOptionDisabled : "")
            )}>
                <span></span>
                <span>Rename list</span>
            </div>
            <div onClick={() => !disabled.delete && actionDelete()} className={classNames(
                css.listOptionBar,
                (disabled.delete ? css.listOptionDisabled : "")
            )}>
                <span></span>
                <span>Delete list</span>
            </div>
            <div onClick={() => !disabled.completed && actionCompleted()} className={classNames(
                css.listOptionBar,
                (disabled.completed ? css.listOptionDisabled : "")
            )}>
                <span></span>
                <span>Delete all completed tasks</span>
            </div>
            {(disabled.rename || disabled.delete) && <div className={css.listOptionNote}>Default categories can't be edited.</div>}
        </TransLayout>
    );
}

export default CategoryOptions;