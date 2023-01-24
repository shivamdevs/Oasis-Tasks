import { useEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import css from './../../../styles/Home.module.css';
import app from "../../../app.data";
import classNames from "classnames";

function TaskList({ data = [], item = "", publish = null, isDesktop = false }) {
    const [extended, setExtended] = useState(false);
    const header = useRef();
    useEffect(() => {
        if (extended && header.current.parentElement.scrollHeight > header.current.parentElement.offsetHeight) {
            header.current.scrollIntoView({ behavior: 'smooth', block: "center" });
        }
    }, [extended]);
    useEffect(() => {
        if (data.completed.length === 0) setExtended(false);
    }, [data.completed.length]);
    return (
        <div className={classNames(
            css.tasksBlock,
            {"desktopOverlook": isDesktop},
            {"scroller": isDesktop}
        )}>
            {(data.length > 0 || data.completed.length > 0) && <>
                {data.map(item => <TaskItem key={item.id} publish={publish} data={item} />)}
                {(data.completed.length > 0) && <>
                    <div className={css.taskCompletedHeader} ref={header} onClick={() => setExtended(!extended)}>
                        <span>Completed ({data.completed.length})</span>
                        {extended && <span className={css.taskCompletedArrow}><i className="fas fa-chevron-up"></i></span>}
                        {!extended && <span className={css.taskCompletedArrow}><i className="fas fa-chevron-down"></i></span>}
                    </div>
                    {extended && data.completed.map(done => <TaskItem key={done.id} completed={true} publish={publish} data={done} />)}
                    {!extended && data.length === 0 && <div className={css.taskEmpty}>
                        <img src="/assets/images/lists/undraw-checklist.svg" alt="" />
                        <div className={css.taskEmptyText}>All tasks completed</div>
                        <div className={css.taskEmptyNote}>Go fo it. You have finished all tasks from this list. Nice work.</div>
                    </div>}
                </>}
            </>}
            {(data.length === 0 && data.completed.length === 0) && <>
                {item === "starred" && <div className={css.taskEmpty}>
                    <img src="/assets/images/lists/undraw-stars.svg" alt="" />
                    <div className={css.taskEmptyText}>No starred tasks</div>
                    <div className={css.taskEmptyNote}>Click <i className="far fa-star"></i> beside a task to star it as an important task so you can easily find them here.</div>
                </div>}
                {item !== "starred" && <div className={css.taskEmpty}>
                    <img src="/assets/images/lists/undraw-waiting.svg" alt="" />
                    <div className={css.taskEmptyText}>No tasks in the list</div>
                    <div className={css.taskEmptyNote}>Click <i className="fas fa-plus"></i> below to add new to-dos and keep track of them easily around the <strong>{app.name}</strong> app.</div>
                </div>}
            </>}
        </div>
    );
}

export default TaskList;