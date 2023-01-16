import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setTitle } from "../../../app.functions";
import { BackHeaderForTasks } from "../../parts/BackHeader";
import { NavAnchor } from "../../parts/Nav";
import CenterLayer from "../CenterLayer";
import css from './../../../styles/Home.module.css';


function Viewer({ currentTask = {}, flipData = null, currentList = {}, setUpdating = null, updating = 0, publish = null }) {
    const navigate = useNavigate();

    setTitle(currentTask?.task, currentList?.label)

    return (
        <CenterLayer maxWidth={600} onOuterClick={() => navigate(-1)}>
            <BackHeaderForTasks
                buttons={[
                    {
                        label: "far fa-cloud-check",
                        disabled: (updating > 0),
                        async action() {
                            setUpdating(old => ++old);
                            await publish();
                            setUpdating(old => --old);
                            toast.success("Task updated");
                        }
                    },
                    {
                        label: "far fa-share-nodes",
                        action() {
                            toast("Sharing is not available at the moment", { duration: 1500 });
                        }
                    },
                    {
                        label: currentTask.starred ? "fas fa-star" : "far fa-star",
                        action() {
                            flipData("starred");
                        }
                    },
                    {
                        label: "fas fa-trash",
                        action() {
                            navigate("./deletetask");
                        }
                    }
                ]}
            />
            <div className={css.todoBody}>
                <NavAnchor to="./movetask" className={css.todoMove}>
                    <span>{currentTask.listname}</span>
                    <i className="fas fa-caret-down"></i>
                </NavAnchor>
                <div className={css.todoTask}>{currentTask.task}</div>
                {currentTask.detail && <div className={css.todoDetail}>{currentTask.detail}</div>}
                {!currentTask.detail && <Link className={css.todoDetail} to="./edittask"><i className="far fa-bars-sort"></i> &nbsp; Add details</Link>}
            </div>
            <div className={css.todoFooter}>
                <Link className={css.todoFooterOpts} to="./edittask">Edit task</Link>
                <span className={css.todoFooterOpts} onClick={() => flipData("checked")}>
                    {currentTask.checked && "Mark as Incomplete"}
                    {!currentTask.checked && "Mark as Completed"}
                </span>
            </div>
        </CenterLayer>
    )
}

export default Viewer;