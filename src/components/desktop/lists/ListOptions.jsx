import classNames from "classnames";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { updateTask } from "../../../fb.todo";
import { LoadSVG } from "../../layouts/Loading";
import css from '../styles/Lists.module.css';


function ListOptions({ currentList = {}, taskArray = {}, userLoading = false, publish = null }) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState({ tasks: false, stars: false, rename: false, delete: false, completed: false });
    useEffect(() => {
        setDisabled({ tasks: false, stars: false, rename: false, delete: false, completed: false });
        if (currentList.key === "starred" || currentList.key === "default") setDisabled(old => {
            old.rename = true;
            old.delete = true;
            return old;
        });
        if (taskArray[currentList.key]?.completed?.length === 0) setDisabled(old => {
            old.completed = true;
            return old;
        });
        if (taskArray[currentList.key]?.length === 0) setDisabled(old => {
            old.tasks = true;
            return old;
        });
        if (taskArray?.starred?.length === 0 && taskArray?.starred?.completed?.length === 0) setDisabled(old => {
            old.stars = true;
            return old;
        });
    }, [currentList.key, taskArray]);

    const actionStar = async () => {
        for (const task of [...taskArray.starred, ...taskArray.starred.completed]) {
            const update = await updateTask(task.id, { starred: false });
            if (update.type !== "success") {
                return toast.error(update.data);
            }
            publish();
        }
        toast.success("All tasks removed from starred");
    };
    const actionMark = async () => {
        for (const task of taskArray[currentList.key]) {
            const update = await updateTask(task.id, { checked: true });
            if (update.type !== "success") {
                return toast.error(update.data);
            }
            publish();
        }
        toast.success("All tasks marked as completed");
    };
    const actionUnmark = async () => {
        for (const task of taskArray[currentList.key].completed) {
            const update = await updateTask(task.id, { checked: false });
            if (update.type !== "success") {
                return toast.error(update.data);
            }
            publish();
        }
        toast.success("All tasks marked as incomplete");
    };
    const actionRename = () => {
        navigate(`/lists/${currentList.key}/renamelist`);
    };
    const actionDelete = () => {
        navigate(`/lists/${currentList.key}/deletelist`);
    };
    const actionCompleted = () => {
        navigate(`/lists/${currentList.key}/deletecompleted`);
    };
    return (
        <div className={css.rightside}>
            <div className={css.listOptionHeader}>
                <span>{currentList.label}</span>
                {(userLoading > 0) && <span className={css.loading}><LoadSVG color="#1e90ff" width={12} /></span>}
                {(userLoading === 0) && <span className={css.loading} onClick={async () => { await publish(); toast.success("All lists updated"); }}><i className="far fa-cloud-check"></i></span>}
            </div>
            <div className={classNames(css.rsBody, css.scroller)}>
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
            </div>
            <footer className={css.rsFooter}>
                <Link to="./newtask" className={css.rsAddnew}><i className="fas fa-plus"></i> Add new task</Link>
            </footer>
        </div>
    )
}

export default ListOptions;