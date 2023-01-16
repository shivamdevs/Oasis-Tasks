import css from './../../../styles/Home.module.css';
import classNames from "classnames";
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../../../fb.todo';
import { toast } from 'react-hot-toast';
import { setTitle } from '../../../app.functions';
import CenterLayer from '../CenterLayer';
import { useState } from 'react';
import { LoadCircle } from '../../layouts/Loading';


function MoveTask({categories = [], setUpdating = null, currentList = {}, currentTask = {}, publish = null}) {
    const params = useParams();
    const navigate = useNavigate();
    const [updating, setNewTask] = useState(false);
    setTitle("Move task", currentTask.task, currentList.label);
    const updateList = async (value) => {
        if (!value) return;
        setNewTask(true);
        await updateTask(params.taskid, { list: value });
        setUpdating(old => ++old);
        navigate(-1);
        publish && await publish();
        setUpdating(old => --old);
        toast.success("Task moved to another list");
    };
    return (
        <CenterLayer maxWidth={400} className={css.todoShift}>
            <div className={css.todoShiftHead}>Move task to</div>
            {categories.length && categories.map(list => {
                if (list.key === "starred") return ("");
                return (
                    <div key={list.key} onClick={() => updateList(list.key)} className={classNames(
                        css.todoShiftItem,
                        (currentTask.list === list.key ? css.todoShiftItemActive : "")
                    )}>
                        <span>{list.label}</span>
                        {currentTask.list === list.key && <i className="fas fa-check"></i>}
                    </div>
                );
            })}
            {updating && <LoadCircle />}
        </CenterLayer>
    );
};

export default MoveTask;