import { useEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import css from './../../../styles/Home.module.css';

function TaskList({ data = [], item = "", publish }) {
    const [extended, setExtended] = useState(false);
    const header = useRef();
    useEffect(() => {
        if (extended) header.current.scrollIntoView({ behavior: 'smooth' });
    }, [extended]);
    return (
        <div className={css.tasksBlock}>
            {(data.length > 0 || data.completed.length > 0) && <>
                {data.map(item => <TaskItem key={item.id} publish={publish} data={item} />)}
                {(data.completed.length > 0) && <>
                    <div className={css.taskCompletedHeader} ref={header} onClick={() => setExtended(!extended)}>
                        <span>Completed ({data.completed.length})</span>
                        {extended && <span className={css.taskCompletedArrow}><i className="fas fa-chevron-up"></i></span>}
                        {!extended && <span className={css.taskCompletedArrow}><i className="fas fa-chevron-down"></i></span>}
                    </div>
                    {extended && data.completed.map(done => <TaskItem key={done.id} completed={true} publish={publish} data={done} />)}
                </>}
            </>}
            {(data.length === 0 && data.completed.length === 0) && <>
                {item === "starred" && <div className={css.taskEmpty}>
                    <img src="/assets/images/lists/undraw-stars.svg" alt="" />
                    <div className={css.taskEmptyText}>No starred tasks!</div>
                    <div className={css.taskEmptyNote}>Click <i className="far fa-star"></i> beside a task to star it.</div>
                </div>}
                {item !== "starred" && <div className={css.taskEmpty}>
                    <img src="/assets/images/lists/undraw-waiting.svg" alt="" />
                    <div className={css.taskEmptyText}>No tasks in the list!</div>
                    <div className={css.taskEmptyNote}>Click <i className="fas fa-plus"></i> below to add a new task.</div>
                </div>}
            </>}
        </div>
    );
}

export default TaskList;